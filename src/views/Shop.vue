<template>
  <div>
    <Header />
    <div class="container">
      <div class="contents">
        <div class="card-space">
          <h2 class="shop-name">{{ restaurants.name }}</h2>
          <div class="card-shop">
            <img
              :src="restaurants.img"
              alt="#"
              width="350px"
              height="auto"
            />
            <p>
              #{{ restaurants.area_name }} #{{
                restaurants.genre_name
              }}
            </p>
            <p>{{ restaurants.content }}</p>
          </div>
        </div>
      </div>
      <div class="contents content-right">
        <div class="card">
          <div class="table-header">
            <div class="table-title">
              <p>予約</p>
              <form action="">
                <input type="date" min="2021-04-30" v-model="reservationDate" />
                <select name="time" id="time" v-model="reservationTime">
                  <option value="" disabled selected hidden>
                    時刻を選択してください
                  </option>
                  <option
                    v-for="timeList in timeLists"
                    :key="timeList"
                    :value="timeList"
                  >
                    {{ timeList }}
                  </option>
                </select>
                <select name="number" id="number" v-model="reservationNumber">
                  <option value="" disabled selected hidden>
                    人数を選択してください
                  </option>
                  <option
                    v-for="numberList in numberLists"
                    :key="numberList"
                    :value="numberList"
                  >
                    {{ numberList }}人
                  </option>
                </select>
              </form>
            </div>
          </div>
          <table>
            <tr>
              <td>Shop</td>
              <td>{{ restaurants.name }}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{{ this.reservationDate }}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{{ this.reservationTime }}</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>{{ this.reservationNumber }}人</td>
            </tr>
          </table>
          <button @click="addReservation(index)">予約する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const d = new Date();
import Header from "../components/Header";
import axios from "axios";
export default {
  components: {
    Header,
  },
  props: ["id"],

  data() {
    return {
      restaurants: [],
      reservationDate: d.toISOString().split('T')[0],
      reservationTime: "10:00",
      reservationDatetime: "",
      reservationNumber: 1,
      timeLists: [],
      numberLists: [],
    };
  },
  methods: {
    getTimeLists() {
      const timeLists = ":00";
      for (let i = 10; i < 22; i++) {
        this.timeLists.push(i + timeLists);
      }
    },
    getNumberLists() {
      for (let i = 1; i < 21; i++) {
        this.numberLists.push(i);
      }
    },
    addReservation() {
      this.reservationDatetime = this.reservationDate + " " + this.reservationTime,
      axios
        .post(
          " http://127.0.0.1:8000/api/shops/" +
            this.id +
            "/reservations",
          {
            shop_id: this.restaurants.id,
            user_id: this.$store.state.user.id,
            reserved_at: this.reservationDatetime,
            num_of_users: this.reservationNumber,
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/reservationthanks");
        });
    },
    getShop() {
      axios.get("http://127.0.0.1:8000/api/shops/" + this.id)
        .then((response) => {
          this.restaurants = response.data.data;
          console.log(response.data.data);
        });
    },
  },
  created() {
    this.getShop();
    this.getTimeLists();
    this.getNumberLists();
  },
};
</script>


<style scoped>
button {
  text-align: center;
  font-size: 1.2rem;
  width: 100%;
  padding: 10px 0px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border: none;
  cursor: pointer;
}

h1 {
  position: absolute;
  left: 52%;
  font-size: 2rem;
  margin: 50px 0 0 0;
}

.container {
  margin: 30px 20px;
  width: 50%;
}

.content-right {
  position: absolute;
  top: 20px;
  left: 50%;
}

input {
  display: block;
  width: 50%;
  margin: 0 0 10px 20px;
}

select {
  display: block;
  width: 80%;
  margin: 0 0 10px 20px;
}

.card {
  width: 300px;
  background-color: rgb(88, 120, 238);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card p {
  font-size: 1.2rem;
  color: white;
  padding: 15px;
}

table {
  margin: 0 0 150px 20px;
  width: 80%;
  height: 100px;
  background-color: rgb(1, 146, 243);
  border-radius: 5px;
}

td {
  text-align: left;
  padding: 8px 0;
  font-size: 1rem;
  color: white;
}

td:first-child {
  padding-right: 5px;
  padding-left: 10px;
}

.contents h2 {
  font-size: 1.8rem;
  margin: 15px 0;
}

.card-shop {
  width: 350px;
  padding-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.card-shop p {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 0;
  line-height: 15px;
}

.shop-name {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>