<template>
  <div class="searchbox">
    <SearchCommponents />
    <div class="searchhistory">
      <h4>历史搜索</h4>
      <div class="searchbox">
        <ul>
          <li v-for="item in searchhistory" :key="item+item.keyword" @click="turnToSearchResult(item.keyword)">
            <span>{{item.keyword}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import SearchCommponents from "@/components/SearchComponents.vue";
export default {
  data() {
    return {
      keyword:'',
      searchhistory: []
    };
  },
  created() {
    this.searchhistory =
      JSON.parse(localStorage.getItem("searchhistory")) || [];
  },
  methods: {
    turnToSearchResult(keyword) {
      this.keyword = keyword
      this.searchhistory = this.searchhistory.filter(e => {
        return e.keyword != this.keyword;
      });
      this.searchhistory.unshift({
        keyword: this.keyword
      });
      localStorage.setItem("searchhistory", JSON.stringify(this.searchhistory));
      this.$router.push({
        path: "/searchResult",
        query: {
          keyword: this.keyword
        }
      });
    }
  },
  components: {
    SearchCommponents
  }
};
</script>
<style lang="scss" scoped>
.searchbox {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: auto;
  z-index: 999;
  .searchhistory {
    width: 100%;
    h4 {
      font-size: 18px;
      padding: 10px 0;
    }
    .searchbox {
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          padding: 3px 20px;
          border: 1px solid #ccc;
          border-radius: 20px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>