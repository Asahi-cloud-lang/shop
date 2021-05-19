<template>
 <div>
    <Header />
    <div class="card">
      <p>ご予約ありがとうございます</p>
      <div class="form">
        <div>
          <button>戻る</button>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import Header from "../components/Header";
export default {
 components: {
   Header
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
  padding: 70px 30px 30px;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
}

.form {
 text-align: center;
 padding: 0px 30px 50px;
}

.form button {
 margin: 15px;
 background-color: blue;
 border-radius: 10px;
 border: none;
}

</style>