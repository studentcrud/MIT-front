<template>
    <div id="board_detail" class="main">
        <div class="board_info">
            <h2>{{this.board.title}}</h2>
        </div>
        <div class="board_contents">
            <p>{{this.board.content}}</p>
        </div>
        <div class="comment">
            <ul>
                <li v-for="item in this.board.comments" :key="item.id">
                    <h6>{{item.user.username}}</h6>
                    <p>{{item.content}}</p>
                </li>
            </ul>
        </div>
        <div class="comment_write">
            <input type="text" placeholder="작성자" v-model="commentWritter">
            <textarea v-model="commentContent" placeholder="댓글을 입력하세요."></textarea>
            <div class="update_btns">
                <button class="colorbtn" @click="insertComment">등록</button>
            </div>
        </div>
        <div class="update_btns">
            <button class="colorbtn">수정</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default{
    name: 'boardsDetail',
    data(){
        return{
            id : this.$route.params.ids,
            board : [],
            commentWritter : "",
            commentContent : ""
        }
    },
    methods:{
        insertComment(){
            axios.post('/api/comments', {
                username : "test",
                contents : this.commentContent
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        axios.get('/api/board/' + this.id)
        .then((res)=>{
            this.board = res.data
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>

<style scoped>

textarea{
    width: 100%;
    height: 50px;
}

.comment_write input{
    width: 100px;
    margin-bottom: 8px;
}

</style>