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
        <span @click="searchChange">换</span>
      </el-row>
    </div>
  </div>
</template>

<script>
// import {searchair} from '@/airsearch/searchForm'
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "返程" }
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
    handleDate(value){
      this.form.departDate=moment(value).format("YYYY-MM-DD")
    },
    handleSearchTab(index) {
      this.currentTab = index;
    },
    //点击出发城市输入值得变化。值得变化是来自后台数据，所以我们要调用api接口
    querySearchDepartCity(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      // console.log(value)
      // cb([
      //   {value:"aaaa"}
      // ])
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        // console.log(res)
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.form.departCity = newData[0].value;
        this.form.departCode = newData[0].sort;
        cb(newData);
        // if()
      });
    },
    //点击到达城市输入值变化
    querySearchDestCity(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res)
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.destCity = newData[0].value;
        this.destCode = newData[0].sort;
        cb(newData);
      });
    },
    // 点击出发城市下拉列表值选中就是当前的值得变化
    handleDepartCity(index) {
      // console.log(value,"aaaaa")
      this.form.departCity = index.value;
      this.form.departCode = index.sort;
    },
    //点击到达城市下拉列表选中就是当前值得变化
    handledestCity(index) {
      this.form.destCity = index.value;
      this.form.destCode = index.sort;
    },

    handleSearch() {
      console.log(this.form);
      //点击搜索，进行内容的验证
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请输入出发城市地址"
        },
        destCity: {
          value: this.form.destCity,
          message: "请输入到达城市地址"
        },
        departDate: {
          value: this.form.departDate,
          message: "请输入出发日期"
        }
      };
      const valid = true;
      //遍历我们里面的值是否输入有效
      Object.keys(rules).forEach(e => {
        if (!valid) return;
        const item = rules[e];
        if (!item.value) {
          this.$alert(item.message, "提示", {
            type: "warning",
            confirmButtonText: "确定",
            showCancelButton: false
          });
        }
        if(!valid) return
        this.$router.push({
          path:'/air/flights',
          query:this.form
        })
      });
      
    },
    searchChange(item) {
      const { departCity, departCode, destCode, destCity } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },
    // 点击返程，提示
    handleSearchTab(index){
      if(index===1){
        this.$alert('暂时没有返程票，请选择单程机票','提示',{
          type:'warning',
          confirmButtonText:'确定',
          showCancelButton:false
        })
      }
    }
  }
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

