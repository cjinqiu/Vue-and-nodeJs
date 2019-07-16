<template>
  <div class="search">
    <div class="search-form">
      <el-row type="flex" class="row-bg" justify="center">
        <span
          class="single"
          v-for="(item,index) in tabs"
          :key="index"
          @click="handleSearchTab(index)"
          :class="{active:index===currentTab}"
        >
          <i :class="item.icon"></i>
          {{item.name}}
        </span>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="出发城市">
            <el-autocomplete
              v-model="form.departCity"
              :fetch-suggestions="querySearchDepartCity"
              placeholder="请选择出发城市"
              @select="handleDepartCity"
              class="el-autocomplete"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="到达城市">
            <el-autocomplete
              v-model="form.destCity"
              :fetch-suggestions="querySearchDestCity"
              placeholder="请选择到达城市"
              @select="handledestCity"
              class="el-autocomplete"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="出发时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="2019-4-30"
                v-model="form.departDate"
                @change="handleDate"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" id="search" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="reverse">
        <span @click="handleSearchFormChange">换</span>
      </el-row>
    </div>
  </div>
</template>

<script>
// import {searchair} from '@/airsearch/searchForm'
import moment from "moment"
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    handleSearchTab(item, index) {
      this.currentTab = index;
    },
    handleSearch() {
      console.log(this.form);
    },
    //出发城市
    querySearchDepartCity(value, cb) {
      // 在正常情况下，没有输值是没有下拉框的、
      if (!value) {
        cb([]);
        return;
      }
      // value代表是输入框的值，值发生改变就出发
      // cb是回调函数，必须调用，必须是返回的一个数组，里面是一个对象，对象中必须有value属性
      // 输出console.log(value)
      // cb([
      //     {value:'aaa'}
      // ])
      // 调用api接口
      this.$axios({
        url: "/airs/city",
        params: {
          name: value //这里我们传的参数是name，而我们输入的值就是我们变化的value的值
        }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        const newdata = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.form.departCity=newdata[0].value
        this.form.departCode=newdata[0].sort
        cb(newdata);
      });
    },
    //到达城市
    querySearchDestCity(value, cb) {
      // 在正常情况下，没有输值是没有下拉框的、
      if (!value) {
        cb([]);
        return;
      }
      // value代表是输入框的值，值发生改变就出发
      // cb是回调函数，必须调用，必须是返回的一个数组，里面是一个对象，对象中必须有value属性
      // 输出console.log(value)
      // cb([
      //     {value:'aaa'}
      // ])
      // 调用api接口
      this.$axios({
        url: "/airs/city",
        params: {
          name: value //这里我们传的参数是name，而我们输入的值就是我们变化的value的值
        }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        const newdata = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.form.destCity=newdata[0].value
        this.form.destCode=newdata[0].sort
        cb(newdata);
      });
    },
    // 出发城市代码
    handleDepartCity(item){
      // console.log(value)
      this.form.departCity=item.value
      this.form.departCode=item.sort
    },
    //到达城市代码
    handledestCity(item){
      this.form.destCity=item.value
      this.form.destCode=item.sort
    },
    // 事假格式的处理
    handleDate(value){
      this.form.departDate=moment(value).format("YYYY-MM-DD")
    },
    handleSearch(){
      // 提交表单验证
      const rules={
        departDate:{
          value:this.form.departCity,
          message:'请输入出发城市'
        },
        destCity:{
          value:this.form.destCity,
          message:'请输入到达城市'
        },
         departDate:{
          value:this.form.departDate,
          message:'请输入出发日期'
        }
      }
      // 验证内容是否有效
       let valid = true; 
     //循环遍历看我们输入值是否有效
     Object.keys(rules).forEach(v => {
       if(!valid) return
       const item=rules[v]
       if(!item.value){
         valid=false
         this.$alert(item.message,"提示",{
           type:'warning',
           confirmButtonText: '确定',
           showCancelButton: false,
         })
       }
     });
     if(!valid) return
     this.$router.push({path:"/air/flights",query:this.form})
    },
    //点击交换，让两个值互换
    handleSearchFormChange(){
      // 要的是出发城市值及下拉框的值跟到达城市值跟下拉框值发生变化
      const {departCity,departCode,destCode,destCity}=this.form
      this.form.departCity=destCity
      this.form.destCity=departCity
      this.form.departCode=destCode
      this.form.destCode=departCode
    },
      // 点击往返tab栏切换
  handleSearchTab(index){
    // 点击往返切换，就是当我们的索引值为1的时候提示它
    if(index===1){
      // this.currentTab=index
      this.$alert("目前不支持返程机票，请使用单程选票","提示",{
        type:'warning',
        confirmButtonText:'确定',
        showCancelButton:false
      })
    }
  }
  },

};
</script>

<style lang="less" scoped>
.search-form {
  border: 1px solid #eee;
  width: 350px;
  height: 350px;
  border-top: none;
  .row-bg {
    justify-content: start;
    margin: 0 0 30px 0;
    span {
      display: block;
      flex: 1;
      text-align: center;
      //    width: 30px;
      height: 48px;
      line-height: 42px;
      background: #eee;
      border-top: 3px #eee solid;
      box-sizing: border-box;
    }
    .active {
      border-top-color: orange;
      background: #fff;
    }
    .el-autocomplete {
      width: 100%;
    }
  }
  #search {
    width: 100%;
    font-size: 16px;
  }
}
.reverse {
  position: absolute;
  top: 100px;
  left: 334px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>

