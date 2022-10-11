<template>
  <div class="classify">
    <h1>classify</h1>
    <div class="classify-list">
      <div>
        <h3>中国菜系</h3>
        <ul>
          <li v-for="item in dishes['中国菜系']" :key="item.classid">
            <router-link :to="{path:'/list',query:{classid:item.classid,classname:item.classname,c:'cookbooklist'}}">
              <img :src="[item.classimg]" />
              <span>{{item.classname}}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="isSource" class="source">未找到资源</div>
        <div class="load" v-if="isLoad">
          <img src="../assets/loading.gif" alt />
        </div>
      </div>
      <div>
        <h3>健康饮食</h3>
        <ul>
          <li v-for="item in dishes['健康饮食']" :key="item.classid">
            <router-link :to="{path:'/list',query:{classid:item.classid,classname:item.classname,c:'cookbooklist'}}">
              <img :src="[item.classimg]" />
              <span>{{item.classname}}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="isSource" class="source">未找到资源</div>
        <div class="load" v-if="isLoad">
          <img src="../assets/loading.gif" alt />
        </div>
      </div>
      <div>
        <h3>四季食谱</h3>
        <ul>
          <li v-for="item in dishes['四季食谱']" :key="item.classid">
            <router-link :to="{path:'/list',query:{classid:item.classid,classname:item.classname,c:'cookbooklist'}}">
              <img :src="[item.classimg]" />
              <span>{{item.classname}}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="isSource" class="source">未找到资源</div>
        <div class="load" v-if="isLoad">
          <img src="../assets/loading.gif" alt />
        </div>
      </div>
      <div>
        <h3>外国菜谱</h3>
        <ul>
          <li v-for="item in dishes['外国菜谱']" :key="item.classid">
            <router-link :to="{path:'/list',query:{classid:item.classid,classname:item.classname,c:'cookbooklist'}}">
              <img :src="[item.classimg]" />
              <span>{{item.classname}}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="isSource" class="source">未找到资源</div>
        <div class="load" v-if="isLoad">
          <img src="../assets/loading.gif" alt />
        </div>
      </div>
      <div>
        <h3>常见菜式</h3>
        <ul>
          <li v-for="item in dishes['常见菜式']" :key="item.classid">
            <router-link :to="{path:'/list',query:{classid:item.classid,classname:item.classname,c:'cookbooklist'}}">
              <img :src="[item.classimg]" />
              <span>{{item.classname}}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="isSource" class="source">未找到资源</div>
        <div class="load" v-if="isLoad">
          <img src="../assets/loading.gif" alt />
        </div>
      </div>
      <div>
        <h3>特色面食</h3>
        <ul>
          <li v-for="item in dishes['特色面食']" :key="item.classid">
            <router-link :to="{path:'/list',query:{classid:item.classid,classname:item.classname,c:'cookbooklist'}}">
              <img :src="[item.classimg]" />
              <span>{{item.classname}}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="isSource" class="source">未找到资源</div>
        <div class="load" v-if="isLoad">
          <img src="../assets/loading.gif" alt />
        </div>
      </div>
      <div>
        <h3>食材大全</h3>
        <ul>
          <li v-for="item in dishes['食材大全']" :key="item.classid">
            <router-link :to="{path:'/list',query:{classid:item.classid,classname:item.classname,c:'cookbooklist'}}">
              <img :src="[item.classimg]" />
              <span>{{item.classname}}</span>
            </router-link>
          </li>
        </ul>
        <div v-if="isSource" class="source">未找到资源</div>
        <div class="load" v-if="isLoad">
          <img src="../assets/loading.gif" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassifyView",
  data() {
    return {
      dishes: {},
      isLoad: true,
      isSource: false
    };
  },
  created() {
    this.getClassifyData();
  },
  methods: {
    getClassifyData() {
      this.$axios
        .get(`/e/extend/api/index.php?m=category&c=listthree`)
        .then(({ data }) => {
          if (data.success == true) {
            this.dealwithData(data.data);
            this.isLoad = false;
          } else {
            this.isLoad = false;
            this.isSource = true;
          }

          // console.log(data);
        });
    },
    dealwithData(data) {
      let newObj = {};
      let classid = null;
      let classname = null;
      data.forEach(item => {
        if (item.bclassid == 0) {
          classid = item.classid;
          classname = item.classname;
          newObj[classname] = [];
        } else {
          newObj[classname].push({
            classid: item.classid,
            classimg: item.classimg,
            classname: item.classname
          });
        }
      });
      this.dishes = newObj;
      // console.log(this.dishes);
    }
  }
};
</script>

<style lang="scss">
.classify {
  padding: 0 10px;
  box-sizing: border-box;
  .classify-list {
    width: 100%;
    margin-bottom: 60px;
    div {
      width: 100%;
      h3 {
        font-size: 18px;
        text-align: left;
        font-weight: bold;
        padding: 10px 0;
      }
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 25%;
          position: relative;
          a {
            color: #000;
          }
          img {
            width: 100%;
            display: block;
            padding: 5px;
            box-sizing: border-box;
          }
          span {
            position: absolute;
            top: 10px;
            left: 10px;
          }
        }
      }
      .source {
        height: 10vh;
        font-size: 20px;
        align-items: center;
      }
      .load{
        width: 100%;
        display: block;
      }
    }
  }
}
</style>