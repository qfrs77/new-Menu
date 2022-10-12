<template>
    <div class="history">
        <ul>
            <li v-for="item in history" :key="item.id" @click="addhistory(item.id,item.img,item.title,item.ftitle,item.onclick)">
                    <div class="list-detail-left">
                        <img :src="[item.img]" alt />
                    </div>
                        <div class="list-detail-right">
                        <h4>{{item.title}}</h4>
                        <p>{{item.ftitle}}</p>
                        <span>{{item.onclick}}收藏</span>
                    </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    name:"BrowHistoryView",
    data() {
    return {
        history:[]
    };
    },
    created() {
        this.history = JSON.parse(localStorage.getItem("history")) || [];
        console.log(this.history);
    },
    computed: {
        
    },
    watch: {
        
    },
    methods: {
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
    }
}

</script>

<style lang="scss">
.history{
    margin-top: 70px;
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
</style>