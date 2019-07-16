<template>
  <!-- <div class="register"> -->
  <el-form ref="form" :model="form" class="form" :rules="rules">
    <el-form-item prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="getCaptcha">获取验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword">
      <el-input placeholder="确认密码" v-model="form.checkPassword" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onRegisterSubmit" class="login">注册</el-button>
    </el-form-item>
  </el-form>
  <!-- </div> -->
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入11位数的手机号", triggle: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入6位数验证码", triggle: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入你的名字", triggle: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", triggle: "blur" }],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    onRegisterSubmit() {
      // 再次进行内容有效验证
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;
          this.$store.dispatch("user/register", props);

          // setTimeout(() => {
          //   this.$message({
          //     type: "success",
          //     message: "正在为您跳转"
          //   });
          // }, 1500);
          // this.$router.back();
        }
        // this.$router.back();
      });
      // console.log(this.form);
    },
    getCaptcha() {
      if (!this.form.username.trim() || this.form.username.length != 11) {
        this.$message({
          type: "warning",
          message: "请输入正确的手机号"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.form.username }
      }).then(res => {
        console.log(res);
        this.$alert(`您的验证码是:${res.data.code}`, "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
  .login {
    width: 100%;
  }
}
</style>

