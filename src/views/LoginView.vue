<template>
  <div class="login">
    <div class="login-back">
      <img src="../assets/back.svg" @click="back" alt />
    </div>
    <div>
      <wd-input label="手机号" label-width="100px" placeholder="请输入手机号" clearable />
      <wd-input label="密码" label-width="100px" placeholder="请输入密码" clearable show-password></wd-input>
      <wd-button type="warning">登录</wd-button>
      <p>
        <span>还没账号？</span>
        <span>请注册</span>
      </p>
    </div>
  </div>
</template>

<script>
import router from "@/router";

import Vue from "vue";
import { Input,Button } from "wot-design";

Vue.use(Input);
Vue.use(Button);

export default {
  name: "LoginView",
  methods: {
    back() {
      router.go(-1);
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
    img {
      width: 30px;
      display: block;
    }
  }
}
</style>