<template>
  <div class="footer">
    <div class="footerIntroduce">
      <div class="postnet">
        <h4>闲云旅游旅游网</h4>
        <ul>
          <li>上亿旅行者共同打造的"旅行神器"</li>
          <li>60,000 多个全球旅游目的地</li>
          <li>60,000 多个全球旅游目的地</li>
          <li>760,000,000 次攻略下载</li>
          <li>38,000 家旅游产品供应商</li>
        </ul>
      </div>
      <div class="aboutIn">
        <h4>关于我们</h4>
        <ul>
          <li>隐私政策 商标声明</li>
          <li>服务协议 游记协议</li>
          <li>商城平台服务协议</li>
          <li>网络信息侵权通知指引</li>
          <li>闲云旅游旅游网服务监督员</li>
          <li>网站地图加入闲云旅游</li>
        </ul>
      </div>
      <div class="postserver">
        <h4>旅行服务</h4>
        <ul>
          <li>旅游攻略 酒店预订</li>
          <li>旅游特价 国际租车</li>
          <li>旅游问答 旅游保险</li>
          <li>旅游指南 订火车票</li>
          <li>旅游资讯 APP下载</li>
        </ul>
      </div>
      <div class="indexCode">
        <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
        <div class="aboutWe">关于我们</div>
      </div>
     
    </div>
     <div class="licence">京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
  background: rgb(51, 51, 51);
  .footerIntroduce {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-width: 1000px;
    padding-top: 45px;
    // flex: 1;
    ul > li {
      color: rgb(204, 204, 204);
      font-size: 12px;
      margin-top: 10px;
    }
    h4 {
      color: rgb(204, 204, 204);
      font-weight: 400;
      margin-bottom: 20px;
    }
    .indexCode{
      text-align: center
    }
    .indexCode > img {
      width: 60%;
      height: 80%;
    }
    .aboutWe {
      color: rgb(204, 204, 204);
      font-size: 14px;
    }
    // .licence{
    //     border-top: 1px solid #ccc;
    // }
  }
  .licence{
        border-top: 1px solid #ccc;
        width: 1000px;
        margin-top: 20px;
        // margin-bottom: 50px;
        text-align: center;
        padding:50px 0;
        font-size: 12px;
        color: rgb(204, 204, 204)
    }
}
</style>

