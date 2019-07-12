<template>
  <div>
    <!-- 头部 -->
    <Header/>
    <nuxt />
    <!-- 底部 -->
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components:{
    Header
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*{
  margin: 0;
  padding:0;
}
ul,li,ol{
  list-style: none;
}
em,i{
  font-style: normal;
}
a{
  color: inherit;
  text-decoration:none;
  box-sizing: border-box;
}
</style>
