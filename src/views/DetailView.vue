<template>
  <div class="detail">
    <div class="detail-back">
      <img src="../assets/back.svg" @click="back" alt />
    </div>
    <div class="detail-content">
      <img :src="[detailImg]" alt />
      <button v-if="isButton" @click="collection">{{isCollection == false ? '收藏' : '已收藏'}}</button>
      <div v-html="step"></div>
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
  name: "DetailView",
  data() {
    return {
      detailID: "",
      detailMenu: "",
      step: "",
      detailImg: "",
      isLoad: true,
      isSource: false,
      isButton: false,
      isCollection: false,
      isSwitch: false,
      favorites: []
    };
  },
  created() {
    this.detailID = this.$route.query.id;
    // this.favorites = JSON.parse(localStorage.getItem("favorites")) || []
  },
  computed: {
    detailUrl() {
      return `/e/extend/api/index.php?m=cookbook&c=detail&appid=com.jingrui.cookbook&id=${this.detailID}`;
    }
  },
  watch: {
    detailUrl() {
      this.$axios.get(this.detailUrl).then(({ data }) => {
        console.log(data);
        if (data.msg == "success" && data.data != false) {
          this.detailMenu = data.data;
          this.step = this.detailMenu.newstext;
          this.detailImg = this.detailMenu.titlepic;
          this.isLoad = false;
          this.isButton = true;
        } else {
          this.isLoad = false;
          this.isSource = true;
        }
      });
    }
  },
  methods: {
    back() {
      router.go(-1);
    },
    collection() {
      if (this.isSwitch == false) {
        this.isCollection = true;
        this.isSwitch = true;
        this.favorites.push({
        id: this.detailMenu.id,
        img: this.detailMenu.titlepic,
        title: this.detailMenu.title,
        ftitle: this.detailMenu.ftitle,
        onclick: this.detailMenu.onclick
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites))
      } else {
        this.isCollection = false;
        this.isSwitch = false;
      }
      
    }
  }
};
</script>
<style lang="scss">
.detail {
  width: 100%;
  position: relative;
  .detail-back {
    width: 100%;
    position: absolute;
    top: 0;
    img {
      width: 30px;
      display: block;
    }
  }
  .detail-content {
    width: 100%;
    img {
      width: 100%;
      display: block;
    }
    button {
      font-size: 18px;
      color: #fff;
      padding: 2px 20px;
      border-radius: 20px;
      border: 0;
      background: #ed912e;
      display: block;
      float: right;
      margin-top: 10px;
      margin-right: 10px;
    }
    div {
      width: 95%;
      margin: 0 auto;
      div {
        display: inline-block;
        text-align: left;
        strong {
          display: block;
          font-size: 18px;
          font-weight: bold;
          padding: 10px 0;
        }
        img {
          width: 100%;
          display: block;
          border-radius: 5px;
        }
      }
    }
  }
}
.source {
  height: 10vh;
  font-size: 20px;
  align-items: center;
  margin-top: 150px;
}
.load {
  width: 100%;
  display: block;
}
</style>