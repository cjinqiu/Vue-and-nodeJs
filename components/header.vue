<template>
  <div class="container">
    <el-row type="flex" class="header" justify="space-between">
      <!-- logo  -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 头部内容部分 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录 -->
      <div>
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar"/>
              <span>{{$store.state.user.userInfo.user.nickname}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handelogOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted(){
    //这里就直接调用store里面存储的用户信息,渲染在页面上
    // console.log(this.$store.state.user.userInfo.user.nickname)
    
    
  },
  methods: {
    handelogOut(){
      this.$store.commit("user/clearUserInfo")// 点击退出登录清空token值跟用户数据
      this.$message.success('退出成功')
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  box-shadow: 0 3px 3px #ccc;
  /* position: relative; */
}
.header {
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}
img {
  width: 156px;
  height: 42px;
  margin-top: 8px;
  margin-right: 12px;
}
.navs {
  flex: 1;
  a {
    height: 60px;
    padding: 0 20px;
    &:hover {
      color: rgb(64, 158, 255);
      border-bottom: 5px solid rgb(64, 158, 255);
    }
  }
  .nuxt-link-exact-active {
    //高亮
    background: rgb(64, 158, 255);
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}
.el-dropdown-link {
  text-align: center;
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;

  }
}
</style>