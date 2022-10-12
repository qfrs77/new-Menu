<template>
    <div class="searchbox">
        <SearchCommponents />
        <div class="searchhistory">
            <div>历史搜索</div>
            <div class="searchbox">
                <div v-for="item in searchhistory" :key="item">{{item.keyword}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import SearchCommponents from "@/components/SearchComponents.vue";
export default {
    data() {
        return {
            searchhistory:[]
        }
    },
    created() {
        this.searchhistory = JSON.parse(localStorage.getItem("searchhistory")) || [];
        console.log(this.searchhistory);
    },
    methods: {

    },
    components: {
    SearchCommponents,
    }
}
</script>
<style lang="scss" scoped>
.searchbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
    z-index: 999;
}
</style>