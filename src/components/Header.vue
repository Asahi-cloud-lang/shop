<template>
 <div class="header flex">
   <div class="right center flex">
     <img src="../assets/rese.png">
     <p>RESE</p>
   </div>
 </div>
</template>

<style scoped>
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
</style>