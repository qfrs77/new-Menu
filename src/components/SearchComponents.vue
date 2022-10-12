<template>
<div class="search--commponent">
    <div class="back" @click="back">返回</div>
    <input type="text" placeholder="搜索菜名或食材" v-model="keyword"/>
    <span @click="turnToSearchResult">搜索</span>
</div>
</template>

<script>
export default {
    data() {
        return {
            keyword:'',
            searchhistory:[]
        };
    },
    created() {
        this.searchhistory = JSON.parse(localStorage.getItem("searchhistory")) || [];
    },
    computed: {

    },
    watch: {

    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        turnToSearchResult() {
            if(this.keyword.length == 0){
                return
            }
            this.searchhistory = this.searchhistory.filter((e) => {
                return e.keyword != this.keyword;
            });
            this.searchhistory.unshift({
                keyword:this.keyword
            })
            localStorage.setItem("searchhistory", JSON.stringify(this.searchhistory));
            this.$router.push({
                path:"/searchResult",
                query:{
                    keyword:this.keyword
                }
            })
        },
    }
}
</script>
<style lang="scss">
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
</style>