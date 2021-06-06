<template>
  <div>
    <Header />
    <div class="search-container">
      <form
        class="form-search"
        id="form-search"
        action="http://localhost:8080/"
        method="get"
      >
        <select id="area" name="area" v-model="selected_area">
          <option disabled value="">Please select area</option>
          <option v-for="area in areas" :key="area.id" :value="area.value">
            {{ area.name }}
          </option>
        </select>
        <select id="genre" name="genre" v-model="selected_genre">
          <option disabled value="">Please select genre</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.value">
            {{ genre.name }}
          </option>
        </select>
        <button type="submit" id="search-button">
          <!--"icon-search"-->
        </button>
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Search..."
          v-model="search"
        />
      </form>
    </div>
    <div class="container">
      <div class="contents">
        <div
          class="card-space"
          v-for="(value, index) in filterRestaurants"
          :key="index"
        >
          <div class="card-shop">
            <img :src="value.img" alt="#" width="180px" height="auto" />
            <p class="shop-name">{{ value.name }}</p>
            <p>#{{ value.area_name }} #{{ value.genre_name }}</p>
            <div class="card-footer">
              <button
                @click="
                  $router.push({
                    path: '/shops/' + value.id,
                    params: { id: value.id },
                  })
                "
              >
                詳しくみる
              </button>
              <img src="../assets/redheart.png"
                @click="deleteLike(value.id)"
                v-if="value.like"
                class="like">
              <img src="../assets/blackheart.png"
                @click="addLike(value.id)"
                v-else
                class="unlike">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";
export default {
  components: {
    Header,
  },
  props: ["id"],
  data() {
    return {
      newRestaurants: [],
      selected_area: "",
      selected_genre: "",
      areas: [
        { name: "All areas", value: "" },
        { name: "東京都", value: "東京都" },
        { name: "大阪府", value: "大阪府" },
        { name: "福岡県", value: "福岡県" },
      ],
      genres: [
        { name: "All genres", value: "" },
        { name: "寿司", value: "寿司" },
        { name: "焼肉", value: "焼肉" },
        { name: "居酒屋", value: "居酒屋" },
        { name: "イタリアン", value: "イタリアン" },
        { name: "ラーメン", value: "ラーメン" },
      ],
      search: "",
    };
  },
  computed: {
    filterRestaurants: function () {
      let filtered = [];
        for (let i in this.newRestaurants) {
          let value = this.newRestaurants[i];
            if (value.area_name.indexOf(this.selected_area) !== -1) {
              if (value.genre_name.indexOf(this.selected_genre) !== -1 ){
                if (value.name.indexOf(this.search) !== -1){
                  filtered.push(value);
                }
              }
            }
        }
        console.log(filtered);
      return filtered;
    }
  },
  methods: {
    addLike(id) {
      axios
        .post(
          "http://127.0.0.1:8000/api/shops/" +
            id +
            "/likes",
          {
            user_id: this.$store.state.user.id,
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    deleteLike(id) {
      axios
        .request({
          method: "delete",
          url:
            "http://127.0.0.1:8000/api/shops/" +
            id +
            "/likes",
          data: { user_id: this.$store.state.user.id },
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: false,
          });
        });
    },

    getShops() {
       axios.get("http://127.0.0.1:8000/api/shops").then((response) => {
        const shops = response.data.data;
        shops.forEach((shop, index) => {
          shop.likes.forEach(like => {
            if ( like.user_id == this.$store.state.user.id ){
              shops[index].like = true;
            } else {
              shops[index].like = false;
            }
          });
        });
        this.newRestaurants = shops;
      });
    },
  },
  created() {
    this.getShops();
  },
};
</script>


<style scoped>
button {
  font-size: 0.8rem;
  width: 80px;
  padding: 4px 0px;
  margin: 10px 0 0 0;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}

h1 {
  position: absolute;
  left: 52%;
  font-size: 2rem;
  margin: 50px 0 0 0;
}

.container {
  margin: 30px 50px;
  width: 90%;
}

.contents {
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
}

.card-space {
  margin: 0 10px 10px 0;
}

.card-shop {
  width: 180px;
  padding-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}

.card-shop p {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 15px;
}

.shop-name {
  font-size: 1.6rem;
  font-weight: bold;
}

.icon-favorite {
  color: rgb(255, 0, 0);
  cursor: pointer;
  padding: 15px 0 0 0;
}

.icon-favorite-none {
  color: rgb(206, 206, 206);
  cursor: pointer;
  padding: 15px 0 0 0;
}

.card-footer {
  display: flex;
  justify-content: space-around;
}

.search-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.form-search {
  display: flex;
  justify-content: end;
  padding: 2px 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}

select {
  border: none;
  outline: none;
  width: 150px;
}

input {
  appearance: none;
  border: none;
  outline: none;
  width: 200px;
}

#search-button {
  color: rgb(180, 180, 180);
  background-color: #fff;
  cursor: pointer;
  border: none;
  width: 30px;
  padding: 0 0 10px 0;
}

.like {
  padding: 10px;
  width:30px;
  cursor: pointer;
}

.unlike {
  padding: 10px;
  width:30px;
  cursor: pointer;
}

</style>