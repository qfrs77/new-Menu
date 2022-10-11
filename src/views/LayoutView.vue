<template>
  <div class="layout">
    <nav>
      <router-link to="/home">首页</router-link>
      <router-link to="/classify">菜谱分类</router-link>
      <router-link to="/about">个人中心</router-link>
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
    z-index: 99999;
    padding: 20px;
    background: #ccc;
    box-sizing: border-box;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>