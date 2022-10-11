<template>
  <div class="detail">
    <div class="detail-back">
      <img src="../assets/back.svg" @click="back" alt />
    </div>
    <div class="detail-content">
      <img :src="[detailImg]" alt />
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
      isSource: false
    };
  },
  created() {
    this.detailID = this.$route.query.id;
  },
  computed: {
    detailUrl() {
      return `/e/extend/api/index.php?m=cookbook&c=detail&appid=com.jingrui.cookbook&id=${this.detailID}`;
    }
  },
  watch: {
    detailUrl() {
      this.$axios.get(this.detailUrl).then(({ data }) => {
        // console.log(data);
        if (data.msg == "success" && data.data != false) {
          this.detailMenu = data.data;
          this.step = this.detailMenu.newstext;
          this.detailImg = this.detailMenu.titlepic;
          this.isLoad = false;
        } else  {
          this.isLoad = false;
          this.isSource = true;
        }

        // console.log(this.foodMaterial);
      });
    }
  },
  methods: {
    back() {
      router.go(-1);
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