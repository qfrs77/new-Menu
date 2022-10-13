<template>
  <div class="ztlist">
    <div class="list-name">
      <img src="../assets/back.svg" @click="back" alt />
      <span>{{className}}</span>
    </div>
    <div class="list-detail">
      <ul>
        <li
          v-for="item in ztListMenu"
          :key="item.id"
          @click.stop="addhistory(item.id,item.titlepic,item.title,item.ftitle,item.onclick)"
        >
          <img :src="[item.titlepic]" alt />
          <h4>{{item.title}}</h4>
        </li>
      </ul>
    </div>
    <div v-if="isSource" class="source">未找到资源</div>
    <div class="load" v-if="isLoad">
      <img src="../assets/loading.gif" alt />
    </div>
  </div>
</template>
  <script>
import router from "@/router";
export default {
  name: "ZtListView",
  data() {
    return {
      ztid: "",
      className: "",
      ztListMenu: "",
      isLoad: true,
      isSource: false,
      history: []
    };
  },
  created() {
    this.ztid = this.$route.query.ztid;
    this.className = this.$route.query.classname;
    this.history = JSON.parse(localStorage.getItem("history")) || [];
    // console.log(this.classID, this.className);
  },
  computed: {
    listUrl() {
      return `/e/extend/api/index.php?m=zt&c=detail&ztid=${this.ztid}&page=1`;
    }
  },
  methods: {
    back() {
      router.go(-1);
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
    }
  },
  watch: {
    listUrl() {
      this.$axios.get(this.listUrl).then(({ data }) => {
        console.log(data.data.cookbookList);
        if (data.msg == "success" && data.data.length != 0) {
          this.ztListMenu = data.data.cookbookList;
          this.isLoad = false;
        } else {
          this.isLoad = false;
          this.isSource = true;
        }
      });
    }
  }
};
</script>
  <style lang="scss">
.ztlist {
  width: 100%;
  .list-name {
    height: 35px;
    line-height: 35px;
    display: flex;
    img {
      width: 30px;
      display: block;
    }
    span {
      flex: 1;
      font-weight: bold;
    }
  }
  .list-detail {
    width: 100%;
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
}
.source {
  height: 10vh;
  font-size: 20px;
  align-items: center;
  margin-top: 30px;
}
.load {
  width: 100%;
  display: block;
}
</style>