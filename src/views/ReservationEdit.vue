<template>
  <div>
    <Header/>
    <div class="logout-decoration">
      <p @click="logout">Logout</p>
    </div>
    <div class="card">
      <h1>Reservation</h1>
      <div class="form">
        <p class="shop-name">{{ this.userReservedRestaurant[0].shop_name }}</p>
        <p><img :src="this.userReservedRestaurant[0].shop_img" alt="#" class="shop-img"/></p>
        <div class="flex">
          <div class="reserved_info">
            <p>DATE: </p>
            <p>TIME: </p>
            <p>Number: </p>
          </div>
          <div>
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
        <button @click="editReservation()">修正</button>
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
  data() {
    return {
      userReservedRestaurant: [],
      reserved_at: "",
      num_of_users: "",
      timeLists: [],
      numberLists: [],
      reservationDate: "",
      reservationTime: "",
      reservationDatetime: "",
      reservationNumber: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", {
        email: "",
        password: "",
      });
    },
    getUserReserved() {
    let data = [];
    axios.get(
      "http://127.0.0.1:8000/api/users/" +
        this.$store.state.user.id +
        "/reservations/" + this.$route.params['shopid'],
      )
      .then((response) => {
        data.push(response.data);
        this.userReservedRestaurant = response.data.data;
        console.log(response.data.data)
        this.reservationDate = this.userReservedRestaurant[0].reserved_at.substr(0, 10);
        this.reservationTime = this.userReservedRestaurant[0].reserved_at.substr(-8, 5);
        this.reservationNumber = this.userReservedRestaurant[0].num_of_users;
    });
    },
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
    editReservation() {
      this.reserved_at = this.reservationDate + " " + this.reservationTime,
      this.num_of_users = this.reservationNumber,
      console.log(this.reserved_at)
      axios
        .put(
          "http://127.0.0.1:8000/api/users/" +
            this.userReservedRestaurant[0].user_id +
            "/reservations/" +
            this.userReservedRestaurant[0].shop_id
            ,
          {
            reserved_at: this.reserved_at,
            num_of_users: this.num_of_users,
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/mypage");
        });
    },
  },
  created() {
    this.getUserReserved();
    this.getTimeLists();
    this.getNumberLists();
  },
};
</script>

<style scoped>
.card {
  margin: 100px auto;
  width: 500px;
  background: blue;
  border-radius: 5px;
  padding: 20px;
  color: white;
}

.card h1 {
  font-size: 2rem;
  text-align: center;
  padding: 10px;
}

.shop-name {
  font-size: 1.5rem;
  padding: 20px 0px;
}

.shop-img {
  width: 100%;
  height: 300px;
  padding-bottom: 10px;
}

.flex {
  display: flex;
}

.reserved_info {
  width: 20%;
}

.reserved_info p {
  line-height: 1.6rem;
  margin: 10px;
}

input, select {
  display: block;
  margin: 10px;
}

button {
  text-align: center;
  font-size: 1.2rem;
  width: 30%;
  padding: 10px 0px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border: none;
  cursor: pointer;
  margin-left: auto;
  display: block;
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

</style>