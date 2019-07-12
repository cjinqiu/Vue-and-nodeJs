<template>
  <div>
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
 data () {
   return {
     urlimg:{
       "http://157.122.54.189:9095/assets/images/th01.jfif"
     }
   }
 }
};
</script>

<style>
</style>
