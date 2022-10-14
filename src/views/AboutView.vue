<template>
  <div class="about">
    <div class="about-my">
      <h1>我的</h1>
      <router-link to="/login">
        <img src="../assets/setUp.svg" alt="">
      </router-link>
      
    </div>
    <div class="about-nav">
      <router-link to="/browHistory">浏览历史</router-link>
      <router-link to="/myCollection">我的收藏</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default{
  created(){
    if(window.location.pathname=='/about'){
      this.$router.push({
        path:'browHistory'
      })
    }
  }
}
</script>
<style lang="scss">
.about{
  width: 100%;
  .about-my,.about-nav{
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    position: fixed;
    background: #fff;
    z-index: 99;
  }
  .about-my{
    top: 0;
    h1{
      font-weight: bold;
    }
    img{
      width: 20px;
      display: block;
      position: absolute;
      top: 8px;
      right: 8px;
      
    }
  }
  .about-nav{
    top:35px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.2);
    a{
      width: 50%;
      color: #000;
      text-decoration: none;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
 
}
</style>
