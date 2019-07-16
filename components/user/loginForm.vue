<template>
  <!-- <div class="login">
    <div class="container">
      <el-form class="demo-ruleForm">
        <el-form-item prop="pass" class="username">
          <el-input type="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>-->
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" type="username" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {},
      // 表单规则
      rules: {
        username: [
          { required: true, message: "用户名不能空", triggle: "blur" }
        ],
        password: [{ required: true, message: "密码不能空", triggle: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      console.log(this.form);
      // 点击登录判断表单里面是否有内容
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login", this.form);
          this.$router.push("/");
          console.log(this);
          this.$message.success("登录成功");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
// .login {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background-color: #2f4050;
//   .container {
//     // height: 700px;
//     // min-width: 1000px;
//     position: absolute;
//     left: 0;
//     right: 0;
//     width: 320px;
//     padding: 0px 40px 15px 40px;
//     margin: 200px auto;
//     background: white;
//     .login-btn {
//       width: 100%;
//     }
//   }
// }
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>

