<template>
  <div>
    <div class="header flex">
      <div class="right center flex">
        <img src="../assets/rese.png">
        <p>RESE</p>
      </div>
    </div>
    <div class="flex1">
      <div class="card" v-for="item in items" :key="item.name">
        <img class="shop-img" :src="item.img">
        <p>{{ item.name }}</p>
        <p>#{{ item.place }}#{{ item.genre }}</p>
        <div class="form">
          <div class="flex">
            <button>詳しくみる</button>
            <img class="heart" src="../assets/redheart.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
computed: {
  items() {
    return this.$store.state.datas;
    }
  }
}
</script>


<style scoped>
/* header部分 */

.center {
 align-items: center;
}

.right p {
 font-size:30px;
 font-weight: bolder;
 color: blue;
}

.right img {
  border-radius: 5px;
  margin: 0px 20px 0px 50px;
  height: 30px;
}

.header {
 margin: 20px;
}

.flex {
 display: flex;
 justify-content: space-between;
}

/* body部分 */

.card {
  margin: 20px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px gray;
}

.shop-img{
  width: 100%;
  border-radius: 10px 10px 0px 0px;
}

.card p:nth-child(2) {
  font-weight: bold;
  padding: 15px;
}

.card p:nth-child(3) {
  font-size: 0.8rem;
  padding: 0px 10px;
}

.form {
 text-align: center;
 padding: 0px 0px 10px;
}

.form button {
  font-size: 0.7rem;
  margin: 15px;
  width: 100px;
  height: 35px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff; 
  background-color: blue;
  border-radius: 10px;
  cursor: pointer;
  border: none;
}

.flex1 {
  display:flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.heart {
  width: 30px;
  height: 30px;
  margin: 20px 30px 20px 80px;
}

</style>