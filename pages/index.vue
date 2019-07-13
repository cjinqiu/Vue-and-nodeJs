<template>
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div

          class="banner-image"
          :style="`background:url(http://localhost:1337${item.url}) center center no-repeat;
        background-size:contain contain;`"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span v-for="(item,index) in tabs" :key="index" @click="handelClick(index)">
            <i>{{item.title}}</i>
          </span>
        </el-row>
        <el-row type="flex" align="middle" 
                class="search-input">
          <input :placeholder="tabs[current].placeholder">
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current:0,
      // 轮播图
      banners: [
        // "http://157.122.54.189:9095/assets/images/th01.jfif",
        // "http://157.122.54.189:9095/assets/images/th02.jfif",
        // "http://157.122.54.189:9095/assets/images/th03.jfif",
        // "http://157.122.54.189:9095/assets/images/th04.jfif"
      ],
      // tab栏
      tabs:[
        {title:'攻略',placeholder:'搜索城市'},
        {title:'酒店',placeholder:'搜索城市输入酒店'},
        {title:'机票',placeholder:''}
      ]
    };
  },
  mounted(){
    // this.prototype.$axios=axios//这里我们不能直接在上面引入axios，不然会报错，可以通过原型
    this.$axios({
      url:'/scenics/banners'
    }).then(res=>{
      console.log(res)
      if(res.status===200){
        this.banners=res.data.data
      }
      // const {data}=res.data
      // this.banners=data
      // console.log(this.banners, '轮播图已经复制')
    })
  },
  methods:{
    handelClick(index){
      if(index===2){
        this.$router.push('/air')
      }
      this.current=index
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  /deep/ .el-carousel__container {
    //使用了第三方组件都要在前面加个deep
    height: 700px;
    // background: green;
  }
  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
