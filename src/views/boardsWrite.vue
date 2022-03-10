<template>
    <div id="board_write" class="main">
        <div>
            <input type="text" placeholder="작성자" v-model="writter">
            <input type="date" v-model="date">
            <input class="title_input" type="text" placeholder="제목을 입력하세요." v-model="title">
        </div>
        <div class="contents">
            <textarea v-model="contents" placeholder="내용을 입력하세요."></textarea>
        </div>
        <div class="update_btns">
            <button class="colorbtn" @click="insertContents">글쓰기</button>
            <button class="back colorbtn" @click="$router.go(-1)">돌아가기</button>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.165:8889';

export default{
    name: 'boardsWrite',
    data(){
        return{
            title : "",
            writter : "",
            date : "",
            contents : ""
        }
    },
    methods:{
        insertContents(){
            axios.post('/', {
                boardTitle : this.title,
                boardWritter : this.writter,
                boardDate : this.date,
                boardContents : this.contents,
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>