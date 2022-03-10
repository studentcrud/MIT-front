<template>
    <div id="board_detail" class="main">
        <div class="board_info">
            <h2>{{this.board[0].board_title}}</h2>
            <div>
                <p>{{this.board[0].board_date}}</p>
                <h4>작성자 : {{this.board[0].board_writter}}</h4>
            </div>
        </div>
        <div class="board_contents">
            <p>{{this.board[0].board_contents}}</p>
        </div>
        <div class="comment">
            <ul>
                <li>
                    <h6>강호동</h6>
                    <p>안녕하세요. </p>
                </li>
                <li>
                    <h6>강호동</h6>
                    <p>ㅋㅋㅋㅋㅋㅋ </p>
                </li>
            </ul>
        </div>
        <div class="comment_write">
            <input type="text" placeholder="작성자">
            <textarea placeholder="댓글을 입력하세요."></textarea>
            <div class="update_btns">
                <button class="colorbtn">등록</button>
            </div>
        </div>
        <div class="update_btns">
            <button class="colorbtn">수정</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.165:8889';

export default{
    name: 'boardsDetail',
    data(){
        return{
            id : this.$route.params.ids,
            board : []
        }
    },
    methods:{
        getData(){
            axios.get('/api/Student/' + this.id)
            .then((res)=>{
                this.student = res.data
            })
            .catch((err)=>{
                console.log(err);
            })
        },
    },
    beforecreate(){
        console.log(this.board)
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