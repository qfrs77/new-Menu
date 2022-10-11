<template>
    <div class="register">
        <div class="register-back">
            <img src="../assets/back.svg" @click="back" alt />
        </div>
    </div>
</template>

<script>
import router from "@/router";
export default{
    name:'RegisterView',
    methods: {
    back() {
      router.go(-1);
    }
  }
}
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
  }}
</style>