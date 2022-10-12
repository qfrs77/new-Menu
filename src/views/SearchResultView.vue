<template>
  <div class="resultbox">
    <div class="search--commponent">
      <div class="back" @click="back">返回</div>
      <input type="text" placeholder="搜索菜名或食材" v-model="newkeyword" />
      <span @click="changekeyword">搜索</span>
    </div>
    <div class="resultList">
      <ul>
        <li
          v-for="item in resultList"
          :key="item.id"
          @click.stop="addhistory(item.id,item.titlepic,item.title,item.ftitle,item.onclick)"
        >
          <div class="list-detail-left">
            <img :src="[item.titlepic]" alt />
          </div>
          <div class="list-detail-right">
            <h4>{{item.title}}</h4>
            <p>{{item.ftitle}}</p>
            <span>{{item.onclick}}收藏</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      newkeyword: "",
      resultList: [],
      history: []
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.history = JSON.parse(localStorage.getItem("history")) || [];
  },
  computed: {
    resulturl() {
      return `/e/extend/api/index.php?m=cookbook&c=search&keyword=${this.keyword}&page=1`;
    }
  },
  watch: {
    resulturl() {
      this.getResultList();
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changekeyword() {
      
      this.keyword = this.newkeyword;
    },
    getResultList() {
      this.$axios.get(this.resulturl).then(({ data }) => {
        console.log(data);
        this.resultList = data.data;
      });
      console.log(this.keyword);
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
  }
};
</script>
<style lang="scss" scoped>
.resultbox {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: auto;
  z-index: 999;
  .search--commponent {
    width: 100%;
    height: 46px;
    text-align: center;
    display: flex;
    .back {
      width: 46px;
      height: 46px;
      line-height: 46px;
    }
    input {
      width: calc(100% - 52px * 2);
      height: 34px;
      margin-top: 6px;
      padding: 0 6px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #fc6976;
      border-radius: 8px;
    }
    span {
      width: 46px;
      height: 46px;
      line-height: 46px;
    }
  }
  .resultList {
    width: 100%;
    ul {
      width: 100%;
      li {
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