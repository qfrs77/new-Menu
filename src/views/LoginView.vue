<template>
  <div class="login">
    <div class="login-back">
      <router-link to="/about">
        <img src="../assets/back.svg" alt />
      </router-link>
    </div>
    <div class="login-form">
      <wd-input v-model="phone" label="手机号" label-width="100px" placeholder="请输入手机号" clearable />
      <wd-input
        v-model="passWord"
        label="密码"
        label-width="100px"
        placeholder="请输入密码"
        clearable
        show-password
      ></wd-input>
      <wd-button type="warning" @click="signIn">登录</wd-button>
      <p>
        <span>还没账号？</span>
        <router-link to="/register" class="plase-register">请注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import router from "@/router";

import Vue from "vue";
import { Input, Button, MessageBox } from "wot-design";

Vue.use(Input);
Vue.use(Button);
Vue.use(MessageBox);

export default {
  name: "LoginView",
  data() {
    return {
      userName: null,
      passWord: "",
      phone: null
    };
  },
  methods: {
    signIn() {
      this.$axios
        .post("http://localhost:3005/user/login", {
          passWord: this.passWord,
          phone: this.phone
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == 200) {
            this.$router.push({ path: "/about" });
            this.userName = data.userName;
            this.phone = data.phone;
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                userName: this.userName,
                phone: this.phone
              })
            );
          }
          if (data.code == 404) {
            if (this.phone.length != 0) {
              //   Dialog.alert({
              //       message: "账号或密码错误",
              //       theme: "round-button"
              //     })
              this.$messageBox.confirm("账号或密码错误", "提示").then(() => {
                this.$messageBox.alert("请修改");
              });
            }
          }
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  position: relative;
  .login-back {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 999;
    img {
      width: 30px;
      display: block;
    }
  }
  .login-form {
    padding: 100px 0;
    p {
      margin-top: 20px;
      .plase-register {
        color: #ff0000;
        text-decoration: none;
      }
    }
  }
}
</style>