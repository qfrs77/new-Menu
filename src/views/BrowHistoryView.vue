<template>
  <div class="history">
    <ul>
      <li
        v-for="item in history"
        :key="item.id"
        @click="addhistory(item.id,item.img,item.title,item.ftitle,item.onclick)"
      >
        <img :src="[item.img]" alt />
        <h4>{{item.title}}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BrowHistoryView",
  data() {
    return {
      history: []
    };
  },
  created() {
    this.history = JSON.parse(localStorage.getItem("history")) || [];
    console.log(this.history);
  },
  computed: {},
  watch: {},
  methods: {
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

<style lang="scss">
.history {
  width: 100%;
  margin-top: 80px;
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