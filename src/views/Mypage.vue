<template>
  <div>
    <Header />
    <div class="logout-decoration">
      <p @click="logout">Logout</p>
    </div>
    <h1>{{ this.$store.state.user.name }}さん</h1>
    <div class="container">
      <div class="contents content-left">
        <h2>予約状況</h2>
        <div
          class="card"
          v-for="(value, index) in userReservedRestaurants"
          :key="index"
        >
          <div class="table-header">
            <div class="table-title">
              <img src="../assets/clock.png" class="clock-img">
              <p>予約{{ index + 1 }}</p>
            </div>

            <img src="../assets/delete.png" class="delete-img"
              @click="deleteReservation(value.shop_id, value.id)"
            >
          </div>
          <table>
            <tr>
              <td>Shop</td>
              <td>{{ value.shop_name }}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{{ value.reserved_at }}</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>{{ value.num_of_users }}人</td>
            </tr>
            <tr>
              <star-rating @rating-selected="putStars(value.shop_id, value.num_of_stars)" v-model="value.num_of_stars" v-if="value.num_of_stars !== null && value.reserved_at.substring(0, 10) <= today " v-bind:star-size="20" class="star" :key="index" v-bind:show-rating="false"></star-rating>
            </tr>
          </table>
          <button @click="$router.push({ path: '/users/' + value.user_id + '/shops/' + value.shop_id + '/reservation/' + value.id  })" class="reservation-edit">
            修正
          </button>
        </div>
      </div>
      <div class="contents">
        <h2>お気に入り店舗</h2>
        <div class="content-right">
          <div
            class="card-space"
            v-for="(value, index) in userLikeRestaurants"
            :key="index"
          >
            <div class="card-shop">
              <img
                :src="value.shop_img"
                alt="#"
                width="180px"
                height="auto"
              />
              <p class="shop-name">{{ value.shop_name }}</p>
              <p>
                #{{ value.area_name }} #{{
                  value.genre_name
                }}
              </p>
              <div class="card-footer">
                <button
                  @click="
                    $router.push({
                      path: '/shops/' + value.shop_id,
                      params: { id: value.shop_id },
                    })
                  "
                >
                  詳しくみる
                </button>
                <img src="../assets/redheart.png" class="heart" @click="deleteLike(value.shop_id)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const d = new Date();
import Header from "../components/Header";
import axios from "axios";
import StarRating from "vue-star-rating";
export default {
  components: {
    Header,
    StarRating,
  },
  props: ["id"],
  data() {
    return {
      today: d.toISOString().split('T')[0],
      userReservedRestaurants: [],
      newUserReservedRestaurants: [],
      userLikeRestaurants: [],
      rating: 0,
      show: true,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", {
        email: "",
        password: "",
      });
    },
    deleteReservation(shopid,reservationid) {
      axios
        .request({
          method: "delete",
          url:
            "https://agile-river-00378.herokuapp.com/api/shops/" +
            shopid +
            "/reservations/" +
            reservationid,
          data: { user_id: this.$store.state.user.id },
        })
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
            "https://agile-river-00378.herokuapp.com/api/shops/" +
            id +
            "/likes",
          data: { user_id: this.$store.state.user.id },
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    async getUserReservedShops() {
      let data = [];
        await axios.get(
          "https://agile-river-00378.herokuapp.com/api/users/" +
            this.$store.state.user.id +
            "/reservations"
        )
        .then((response) => {
          data.push(response.data);
          this.userReservedRestaurants = response.data.data;
          console.log(this.userReservedRestaurants);
        });
    },
    async getUserLikeShops() {
      let data = [];
      await axios
        .get(
          "https://agile-river-00378.herokuapp.com/api/users/" +
            this.$store.state.user.id +
            "/likes"
        )
        .then((response) => {
          data.push(response.data);
          this.userLikeRestaurants = data[0].data;
          console.log(this.userLikeRestaurants);
        });
    },
    putStars(shopid, stars){
      axios
        .put(
          "https://agile-river-00378.herokuapp.com/api/users/" +
            this.$store.state.user.id +
            "/evaluations/" +
            shopid
            ,
          {
            num_of_stars: stars,
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/mypage");
        });
    },
  },
  created() {
    this.getUserReservedShops();
    this.getUserLikeShops();
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
  display: flex;
  justify-content: space-between;
}

.contents {
  margin: 100px 0 0 0;
  width: 50%;
}

.content-left {
  margin-left: 40px;
}

.content-right {
  display: flex;
  justify-content: stretch;
}

.contents h2 {
  font-size: 1.8rem;
  margin: 15px 0;
}

.card {
  width: 80%;
  padding-bottom: 20px;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
  margin-bottom: 10px;
}
.card p {
  font-size: 1.2rem;
  color: white;
  padding: 15px;
}

.card-space {
  margin: 0 40px 40px 0;
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

.card-footer {
  display: flex;
  justify-content: space-around;
}

.shop-name {
  font-size: 1.6rem;
  font-weight: bold;
}

table {
  margin: 0 0 0 20px;
}

td {
  text-align: left;
  padding: 10px 0 0 0;
  font-size: 1rem;
  color: white;
}

td:first-child {
  padding-right: 10px;
}

.table-header {
  display: flex;
  justify-content: space-between;
}

.table-title {
  display: flex;
  justify-content: start;
  margin-left: 10px;
}

.icon-clock {
  color: white;
  padding: 10px;
}

.icon-cancel {
  color: white;
  padding: 10px;
  cursor: pointer;
}

.icon-favorite {
  color: rgb(255, 0, 0);
  cursor: pointer;
  padding: 15px 0 0 0;
}

.table-footer {
  display: flex;
  justify-content: space-around;
}

.clock-img {
  height: 20px;
  padding: 15px 0px 15px 15px;
}

.delete-img {
  height: 20px;
  padding: 15px 15px 15px 0px;
  cursor: pointer;
}

.heart {
  padding: 15px;
  width: 35px;
  cursor: pointer;
}

.logout-decoration {
  width: 95%;
}

.logout-decoration p{
  right: auto;
  font-size: 1.2rem;
  width: 100px;
  height: 30px;
  line-height: 30px;
  padding: 10px 0px; 
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-left: auto;
}

.reservation-edit {
  font-size: 0.8rem;
  width: 80px;
  padding: 4px 0px; 
  color: rgb(68, 0, 255);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  display: block;
  margin: 15px auto 0px;
}

.star {
  margin: 20px 0px 10px;
  cursor: pointer;
}
</style>