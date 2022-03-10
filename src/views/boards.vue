<template>
    <div id="board" class="main">
        <div>
            <ul class="lists tbody">
                <li v-for="item in this.$store.getters.setPages" :key="item.id" @click="goDetail(item.id)">
                    <p class="short">{{item.id}}</p>
                    <p class="title">{{item.title}}</p>
                    <p class="short">{{item.date}}</p>
                    <p class="short">{{item.writter}}</p>
                </li>
            </ul>
            <div class="update_btns">
                <button class="colorbtn" @click="goWrite">글쓰기</button>
            </div>
            <div class="paging_btn">
                <button v-show="this.$store.state.pageNum != 0" @click="prevs">◀</button>
                <p>{{this.$store.state.pageNum + 1}}</p>
                <button v-show="this.pageEnd >= this.$store.state.pageNum"  @click="nexts">▶</button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'boards',
    data(){
        return {
            pageEnd : this.$store.getters.countPages / this.$store.state.index -1
        }
    },
    methods:{
        goDetail(num){
            this.$router.push({
                name : 'boards-detail',
                params : {
                    ids : num
                }
            })
        },
        goWrite(){
            this.$router.push('/boards-write')
        },
        prevs(){
            this.$store.commit('prev');
        },
        nexts(){
            this.$store.commit('next');
        }
    },
    created(){
        this.$store.commit('sortBoards');
    }
}
</script>

<style scoped>
.title{
    max-width: 600px;
    width: 100%;
}

.lists li{
    cursor: pointer;
}

.short{
    width: 50px;
    font-size: 11px;
}
</style>