<template>
  <div class="detail">
    <div class="detail-back">
      <img src="../assets/back.svg" @click="back" alt />
    </div>
    <div class="detail-content">
      <img :src="[detailImg]" alt />
      <div v-if="isSwitch">
        <button v-if="!tfhas" @click="addcollection">收藏</button>
        <button v-else @click="delcollection">已收藏</button>
      </div>
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
      isSwitch: false,
      favorites: []
    };
  },
  created() {
    this.detailID = this.$route.query.id;
    this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  },
  computed: {
    detailUrl() {
      return `/e/extend/api/index.php?m=cookbook&c=detail&appid=com.jingrui.cookbook&id=${this.detailID}`;
    },
    tfhas() {
      let flag = false;
      this.favorites.forEach(e => {
        if (e.id == this.detailID) {
          flag = true;
        }
      });
      return flag;
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
          this.isSwitch = true;
        } else {
          this.isLoad = false;
          this.isSwitch = false;
          this.isSource = true;
        }
      });
    }
  },
  methods: {
    back() {
      router.go(-1);
    },
    addcollection() {
      this.favorites.unshift({
        id: this.detailMenu.id,
        img: this.detailMenu.titlepic,
        title: this.detailMenu.title,
        ftitle: this.detailMenu.ftitle,
        onclick: this.detailMenu.onclick
      });

      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    delcollection() {
      this.favorites = this.favorites.filter(e => {
        return e.id != this.detailID;
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
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
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      div {
        display: inline-block;
        text-align: left;
        margin: 5px 0;
        strong {
          display: block;
          font-size: 18px;
          font-weight: bold;
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