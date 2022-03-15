<template>
    <div id="board" class="main">
        <div>
            <ul class="lists tbody">
                <li v-for="item in this.boardIndex" :key="item.boardId" @click="goDetail(item.boardId)">
                    <p class="short">{{item.boardId}}</p>
                    <p class="title">{{item.title}}</p>
                    <p class="short">{{item.modifiedAt.slice(0,10)}}</p>
                </li>
            </ul>
            <div class="update_btns">
                <button class="colorbtn" @click="goWrite">글쓰기</button>
            </div>
            <div class="paging_btn">
                <button @click="prevPage" v-show="this.boardPageCount !== 1">◀</button>
                <p>{{this.boardPageCount}}</p>
                <button @click="nextPage" v-show="indexPage">▶</button>
            </div>
        </div>
    </div>
</template>

<script>
import {getBoardIndex} from '../../api/index.js';

export default{
    name: 'boards',
    data(){
        return {
            boardIndex: [],
            boardPageCount: 1
        }
    },
    computed: {
        indexPage(){
            if(this.boardIndex.length < 8){
                return false;
            }else{
                return true;
            }
        }
    },
    methods:{
        goDetail(num){
            this.$router.push({
                name : 'boardsDetail',
                params : {
                    ids : num
                }
            })
        },
        goWrite(){
            this.$router.push('/boards-write')
        },
        loadPageIndex(){
            getBoardIndex(this.boardPageCount)
            .then((res)=>{
                this.boardIndex = res.data.data
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        prevPage(){
            this.subjectPageCount--;
            this.loadPageIndex();
        },
        nextPage(){
            this.subjectPageCount++;
            this.loadPageIndex();
        }
    },
    created(){
        this.loadPageIndex();
    }
}
</script>

<style scoped>
</style>