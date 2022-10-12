<template>
  <div class="list">
    <div class="list-name">
      <img src="../assets/back.svg" @click="back" alt />
      <span>{{className}}</span>
    </div>
    <div class="list-detail">
      <ul>
        <li v-for="item in listMenu" :key="item.id"  @click.stop="addhistory(item.id,item.titlepic,item.title,item.ftitle,item.onclick)">
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
    <div v-if="isSource" class="source">未找到资源</div>
    <div class="load" v-if="isLoad">
      <img src="../assets/loading.gif" alt />
    </div>
  </div>
</template>
<script>
import router from "@/router";
export default {
  name: "ListView",
  data() {
    return {
      classID: "",
      className: "",
      classC:"",
      meals:"",
      listMenu: "",
      isLoad: true,
      isSource: false,
      history:[]
    };
  },
  created() {
    this.classID = this.$route.query.classid;
    this.className = this.$route.query.classname;
    this.classC = this.$route.query.c;
    this.meals = this.$route.query.meals;
    this.history = JSON.parse(localStorage.getItem("history")) || [];
    // console.log(this.classID, this.className);
  },
  computed: {
    listUrl() {
      return `/e/extend/api/index.php?m=cookbook&c=${this.classC}&classId=${this.classID}&page=1&appid=com.jingrui.cookbook&meals=${this.meals}`;
    }
  },
  methods: {
    back() {
      router.go(-1);
    },
    addhistory(id,img,title,ftitle,onclick) {
      this.history = this.history.filter((e) => {
        return e.id != id;
      });
      this.history.unshift({
        id:id,
        img:img,
        title:title,
        ftitle:ftitle,
        onclick:onclick,
      })
      localStorage.setItem("history", JSON.stringify(this.history));
      console.log("aaa");
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    }
  },
  watch: {
    listUrl() {
      this.$axios.get(this.listUrl).then(({ data }) => {
        console.log(data);
        if (data.msg == "success" && data.data.length != 0) {
          this.listMenu = data.data;
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
.list {
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
              overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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