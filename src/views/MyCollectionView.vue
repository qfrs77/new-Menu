<template>
  <div class="collection">
    <ul>
      <li
        v-for="item in favorites"
        :key="item.id"
        @click="addfavorites(item.id,item.img,item.title,item.ftitle,item.onclick)"
      >
        <router-link :to="{path:'/detail',query:{id:item.id}}">
          <img :src="[item.img]" alt />
          <h4>{{item.title}}</h4>
        </router-link>
      </li>
    </ul>
  </div>
</template>
    
    <script>
export default {
  name: "BrowfavoritesView",
  data() {
    return {
      favorites: []
    };
  },
  created() {
    this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(this.favorites);
  },
  computed: {},
  watch: {},
  methods: {
    addfavorites(id, img, title, ftitle, onclick) {
      this.favorites.push({
        id: id,
        img: img,
        title: title,
        ftitle: ftitle,
        onclick: onclick
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }
};
</script>
    
    <style lang="scss">
.collection {
  margin-top: 80px;
  width: 100%;
  margin-bottom: 60px;

  padding: 0 10px;
  box-sizing: border-box;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 48%;
      margin-bottom: 10px;
      color: #000;
      text-decoration: none;
      img {
        width: 100%;
        height: 100px;
        border-radius: 5px;
      }
      h4 {
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>