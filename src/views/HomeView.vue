<template>
  <div class="home">
    <div class="searchbox" @click="turnToSearch">
      <input type="text" placeholder="搜索菜名或食材" />
    </div>
    <div class="home-nav">
      <div>
        <router-link :to="{path:'/list',query:{classname:'早餐',c:'meals',meals:'1'}}">
          <img src="../assets/breakfast.png" alt />
          <p>早餐</p>
        </router-link>
      </div>
      <div>
        <router-link :to="{path:'/list',query:{classname:'午餐',c:'meals',meals:'2'}}">
          <img src="../assets/lunch.png" alt />
          <p>午餐</p>
        </router-link>
      </div>
      <div>
        <router-link :to="{path:'/list',query:{classname:'晚餐',c:'meals',meals:'3'}}">
          <img src="../assets/dinner.png" alt />
          <p>晚餐</p>
        </router-link>
      </div>
      <div>
        <div>
          <router-link :to="{path:'/list',query:{classname:'热门菜谱',c:'meals',meals:'hot'}}">
            <img src="../assets/hot.png" alt />
            <p>热门菜谱</p>
          </router-link>
          <router-link :to="{path:'/list',query:{classname:'最新菜谱',c:'meals',meals:'new'}}">
            <img src="../assets/new.png" alt />
            <p>最新菜谱</p>
          </router-link>
        </div>
      </div>
    </div>

    <div class="home-list">
      <h3>精选菜谱</h3>
      <ul>
        <li
          v-for="item in carefullyMenu"
          :key="item.id"
          @click.stop="addhistory(item.id,item.titlepic,item.title,item.ftitle,item.onclick)"
        >
          <div>
            <img :src="[item.titlepic]" alt />
            <p>
              <span class="title">{{item.title}}</span>
              <span>{{item.onclick}}</span>
            </p>
          </div>
        </li>
      </ul>
      <div v-if="isSource" class="source">未找到资源</div>
      <div class="load" v-if="isLoad">
        <img src="../assets/loading.gif" alt />
      </div>
      <h3>最新专题</h3>
      <ol>
        <li
          v-for="item in newMenu"
          :key="item.ztid"
        >
        <router-link :to="{path:'/ztList',query:{classname:item.ztname,ztid:item.ztid}}">
          <div>
            <img :src="[item.ztimg]" alt />
            <p>{{item.ztname}}</p>
          </div>
          </router-link>
        </li>
      </ol>
      <div v-if="isSource" class="source">未找到资源</div>
      <div class="load" v-if="isLoad">
        <img src="../assets/loading.gif" alt />
      </div>
      <h3>热门专题</h3>
      <ol>
        <li
          v-for="item in hotMenu"
          :key="item.ztid"
        >
        <router-link :to="{path:'/ztList',query:{classname:item.ztname,ztid:item.ztid}}">
          <div>
            <img :src="[item.ztimg]" alt />
            <p>{{item.ztname}}</p>
          </div>
          </router-link>
        </li>
      </ol>
      <div v-if="isSource" class="source">未找到资源</div>
      <div class="load" v-if="isLoad">
        <img src="../assets/loading.gif" alt />
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "HomeView",
  data() {
    return {
      carefullyMenu: "",
      newMenu: "",
      hotMenu: "",
      isLoad: true,
      isSource: false,
      history: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getHomeData();
    this.history = JSON.parse(localStorage.getItem("history")) || [];
  },
  methods: {
    getHomeData() {
      this.$axios
        .get(`/e/extend/api/index.php?m=home&c=data&appid=com.jingrui.cookbook`)
        .then(({ data }) => {
          // console.log(data);
          console.log(data.data);
          if (data.msg == "success" && data.data.length != 0) {
            this.carefullyMenu = data.data.cookbookList;
            this.newMenu = data.data.newZt;
            this.hotMenu = data.data.hotZt;
            this.isLoad = false;
          } else {
            this.isLoad = false;
            this.isSource = true;
          }
        });
    },
    addhistory(id, img, title, ftitle, onclick) {
      this.history = this.history.filter(e => {
        return e.id != id;
      });
      this.history.unshift({
        id: id,
        img: img,
        title: title,
        ftitle: ftitle,
        onclick: onclick
      });
      localStorage.setItem("history", JSON.stringify(this.history));
      console.log("aaa");
      this.$router.push({
        path: "/detail",
        query: {
          id: id
        }
      });
    },
    turnToSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    // turnToList(){
    //   this.$router.push({
    //     path: "/list"
    //   });
    // }
  }
};
</script>

<style lang="scss">
a {
  color: #000;
  text-decoration: none;
}
.home {
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 60px;
  .searchbox {
    width: 100%;
    height: 46px;
    input {
      width: 100%;
      height: 34px;
      margin-top: 6px;
      padding: 0 7px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #fc6976;
      border-radius: 8px;
    }
  }
  .home-nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      width: 48%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      position: relative;
      a {
        width: 100%;
        img {
          width: 100%;
          height: 130px;
          border-radius: 5px;
        }
      }
      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        a {
          width: 48%;
          img {
            width: 100%;
            height: 130px;
            border-radius: 5px;
          }
        }
      }
      p {
        display: block;
        font-size: 18px;
        position: absolute;
        top: 2px;
      }
    }
  }
  .home-list {
    h3 {
      font-size: 18px;
      font-weight: bold;
      margin: 10px 0;
      text-align: left;
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 5px;
      li {
        width: 47%;
        margin-bottom: 5px;
        img {
          width: 100%;
          height: 110px;
          display: block;
          border-radius: 5px;
        }
        p {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 5px;
          .title {
            width: 60%;
            text-align: left;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    ol {
      width: 100%;
      li {
        width: 100%;
        margin-bottom: 5px;
        position: relative;
        img {
          width: 100%;
          border-radius: 5px;
        }
        p {
          width: 100%;
          font-size: 18px;
          color: #fff;
          text-align: left;
          padding: 3px 0;
          position: absolute;
          bottom: 5px;
          background-color: rgba(0, 0, 0, 0.3);
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
}

.source {
  height: 10vh;
  font-size: 20px;
  align-items: center;
}
.load {
  width: 100%;
  display: block;
}
</style>
