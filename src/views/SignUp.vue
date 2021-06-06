<template>
  <div>
    <HeaderAuth />
    <div class="card">
      <p>Registration</p>
      <div class="form">
        <div class="name-wrapper">
          <img src="../assets/person.png">
          <input placeholder="Username" type="text" v-model="name"/>
        </div>
        <div class="email-wrapper">
          <img src="../assets/mail.png">
          <input placeholder="Email" type="email" v-model="email"/>
        </div>
        <div class="password-wrapper">
          <img src="../assets/key.png">
          <input placeholder="password" type="password" v-model="password"/>
        </div>
        <div class="button-wrapper">
          <button @click="auth">登録</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  components: {
    HeaderAuth
  },
  methods: {
    auth() {
      axios
        .post("http://127.0.0.1:8000/api/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          this.$router.replace("/loginthanks");
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style scoped>
button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  cursor: pointer;
  margin: 15px;
  background-color: blue;
  border-radius: 10px;
  border: none;
}
.card {
  margin: 100px auto;
  width: 350px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px gray;
}
.card p {
  font-weight: bold;
  color: #fff;
  background-color: blue;
  padding: 20px;
  border-radius: 10px 10px 0px 0px;
}
input {
  width: 70%;
  padding: 10px 10px 3px 0px;
  border: none;
  border-bottom: 1px solid black;
  color: black;
  line-height: 1rem;
}
.form {
  text-align: center;
}

.form img {
  vertical-align: bottom;
  padding-right: 10px;
  margin-top: 10px;
}

.name-wrapper {
  padding: 20px 10px 0px;
}

.email-wrapper {
  padding: 10px 10px 10px;
}

.password-wrapper {
  padding: 0px 10px 20px;
}

.button-wrapper {
  text-align: right;
}
</style>