<template>
  <div class="collection">
    <ul>
      <li
        v-for="item in favorites"
        :key="item.id"
        @click="addfavorites(item.id,item.img,item.title,item.ftitle,item.onclick)"
      >
        <router-link :to="{path:'/detail',query:{id:item.id}}">
          <div class="list-detail-left">
            <img :src="[item.img]" alt />
          </div>
          <div class="list-detail-right">
            <h4>{{item.title}}</h4>
            <p>{{item.ftitle}}</p>
            <span>{{item.onclick}}收藏</span>
          </div>
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
  margin-top: 70px;
  width: 100%;
  ul {
    width: 100%;
    li {
      width: 100%;
      a {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        color: #000;
        text-decoration: none;
        text-align: left;
        .list-detail-left {
          width: 40%;
          img {
            width: 100%;
            height: 100px;
            display: block;
            border-radius: 5px;
          }
        }
        .list-detail-right {
          width: 60%;
          position: relative;
          margin-left: 10px;
          h4 {
            font-weight: bold;
            text-align: left;
            margin-bottom: 15px;
          }
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span {
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
}
</style>