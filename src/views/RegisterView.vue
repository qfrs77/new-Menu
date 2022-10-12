<template>
  <div class="register">
    <div class="register-back">
      <img src="../assets/back.svg" @click="back" alt />
    </div>
    <div class="register-form">
      <h3>Menu</h3>
      <wd-input v-model="userName" label="用户名" label-width="100px" placeholder="请输入用户名" clearable />
      <wd-input v-model="phone" label="手机号" label-width="100px" placeholder="请输入手机号" clearable />
      <wd-input v-model="email" label="邮箱" label-width="100px" placeholder="请输入邮箱" clearable />
      <wd-input v-model="passWord" label="密码" label-width="100px" placeholder="请输入密码" clearable show-password></wd-input>
      <wd-button type="warning" @click="onSubmit">注册</wd-button>
      <p>
        <span>已注册？</span>
        <router-link to="/login" class="plase-register">请登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import router from "@/router";
let rep_phone = /^1[3-9]\d{9}$/;
export default {
  name: "RegisterView",
  data() {
    return {
      userName: "",
      passWord: "",
      phone: "",
      time: "",
      id: "",
      email: "",
    };
  },
  methods: {
    back() {
      router.go(-1);
    },
    onSubmit() {
      this.register(
        this.userName,
        this.passWord,
        this.phone,
        this.time,
        this.id,
        this.email
      );
    },
    register(userName, passWord, phone, time, id, email) {
      if (rep_phone.test(phone)) {
        this.$axios
          .post("http://localhost:3005/user/register", {
            userName,
            passWord,
            phone,
            time,
            id,
            email
          })
          .then(response => {
            return response.data;
          })
          .then(data => {
            if (data.code == 200) {
              this.$router.push({ path: "/login" });
            } else if (data.code == 201) {
            this.$messageBox.confirm("手机号码或邮箱已存在", "提示").then(() => {
                this.$messageBox.alert("可前往登录");
              });
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
.register {
  width: 100%;
  position: relative;
  .register-back {
    width: 100%;
    position: absolute;
    top: 0;
    img {
      width: 30px;
      display: block;
    }
  }
  .register-form{
    padding: 100px 0;
    h3{
      font-size: 60px;
      font-weight: bold;
      padding-bottom: 50px;
    }
    p{
        margin-top: 20px;
        .plase-register{
            color: #ff0000;
            text-decoration: none;
        }
    }
  }
}
</style>