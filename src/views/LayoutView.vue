<template>
  <div class="layout">
    <nav>
      <router-link to="/home">
      <img src="../assets/home.svg" alt="">
      <span>首页</span>
      </router-link>
      <router-link to="/classify">
      <img src="../assets/classify.svg" alt="">
      <span>菜谱分类</span>
      </router-link>
      <router-link to="/about">
      <img src="../assets/about.svg" alt="">
      <span>个人中心</span>
      </router-link>
    </nav>
    <router-view />
  </div>
</template>
  
<style lang="scss">
.layout {
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    z-index: 99;
    padding: 5px 20px;
    background: #fff;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,.2);
    a {
      font-weight: bold;
      color: #666;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      img{
        width: 30px;
      }
    }
  }
}
</style>