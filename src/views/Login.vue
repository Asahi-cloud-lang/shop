<template>
 <div>
    <HeaderAuth />
    <div class="card">
      <p>Login</p>
      <div class="form">
        <div>
          <img src="../assets/mail.png">
          <input placeholder="Email" type="email" />
        </div>
        <div>
          <img src="../assets/rock.png">
          <input placeholder="password" type="password" />
        </div>
        <div>
          <button>ログイン</button>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
export default {
 components: {
   HeaderAuth
 }
};
</script>

<style scoped>
button {
 width: 100px;
 text-align: center;
 padding: 8px 0 10px;
 color: #fff;
 background-color: #5419da;
 border-radius: 25px;
 cursor: pointer;
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

.form div:nth-child(1) {
 padding: 20px 10px 0px;
}

.form div:nth-child(2) {
 padding: 0px 10px 20px;
}

.form div:nth-child(3) {
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

.form button {
 margin: 15px;
 background-color: blue;
 border-radius: 10px;
 border: none;
}

</style>