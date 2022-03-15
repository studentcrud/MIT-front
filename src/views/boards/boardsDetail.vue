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
                <li v-for="item in this.comment" :key="item.contentId">
                    <div class="board_comment_btn">
                        <h6>{{item.contentUsername}}</h6>
                        <div v-if="$store.state.userId == item.contentUsername">
                            <button v-if="showUpdateComment != item.contentId" @click="updateCommentToggle(item.contentUsername, item.contentId)"><img src="../../assets/img/edit.png" alt="수정"></button>
                            <button @click="removeComment(item.contentUsername, item.boardId, item.contentId)"><img src="../../assets/img/remove.png" alt="삭제"></button>
                        </div>
                    </div>
                    <p v-if=" showUpdateComment != item.contentId">{{item.content}}</p>
                    <textarea v-if=" showUpdateComment == item.contentId" v-model="item.content"/>
                    <div v-if=" showUpdateComment == item.contentId" class="update_comment_form">
                        <button @click="updateComment(item.boardId, item.contentId, item.content)">확인</button>
                        <button @click="showUpdateComment = ''">취소</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="comment_write">
            <p>{{this.$store.state.userId}}</p>
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
            boardId : this.$route.params.ids,
            board : [],
            comment : [],
            commentContent : "",
            showUpdateComment : ""
        }
    },
    methods:{
        updateCommentToggle(uid, num){
            if(this.$store.state.userId == uid){
                this.showUpdateComment = num;
                console.log(this.showUpdateComment);
            }else{
                alert('권한이 없습니다.');
            }
        },
        insertComment(){
            axios.post('/api/comments', JSON.stringify({"boardId": this.boardId, "content" : this.commentContent}), {
                headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ` + localStorage.getItem("token")
                }
            })
            .then((res)=>{
                console.log(res);
                this.$router.go();
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        updateComment(boardId, id, content){
            axios.put('/api/comments', JSON.stringify({"boardId" : boardId, "commentId": id, "content" : content}), {
                headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ` + localStorage.getItem("token")
                }
            })
            .then((res)=>{
                console.log(res);
                this.$router.go();
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        removeComment(uid, boardId, id){
            if(this.$store.state.userId == uid){
                axios.delete('/api/comments/' + id, JSON.stringify({"comments.board.boardId" : boardId, "comments.id": id}), {
                    headers: {
                        "Content-Type" : `application/json`,
                        "Authorization" : `Bearer ` + localStorage.getItem("token")
                    }
                })
                .then((res)=>{
                    console.log(res);
                    this.$router.go();
                })
                .catch((err)=>{
                    console.log(err);
                })
            }else{
                alert('권한이 없습니다.');
            }
        }
    },
    created(){
        axios.get('/api/board/' + this.boardId)
        .then((res)=>{
            this.board = res.data
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
        axios.get('/api/comments/' + this.boardId)
        .then((res)=>{
            this.comment = res.data
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
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