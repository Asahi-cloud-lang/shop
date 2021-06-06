<template>
 <div>
    <HeaderAuth />
    <div class="card">
      <p>Login</p>
      <div class="form">
        <div class="email-wrapper">
          <img src="../assets/mail.png">
          <input placeholder="Email" type="email" v-model="email"/>
        </div>
        <div class="password-wrapper">
          <img src="../assets/key.png">
          <input placeholder="password" type="password" v-model="password"/>
        </div>
        <div class="button-wrapper">
          <button @click="auth">ログイン</button>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
   HeaderAuth
  },
  methods: {
    auth() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
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

.form img {
 vertical-align: bottom;
 padding-right: 10px;
 margin-top: 10px;
}

.email-wrapper {
 padding: 20px 10px 0px;
}

.password-wrapper {
 padding: 0px 10px 20px;
}

.button-wrapper {
 text-align: right;
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

</style>