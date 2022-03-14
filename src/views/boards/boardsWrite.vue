<template>
    <div id="board_write" class="main">
        <div>
            <input class="board_title_input" type="text" placeholder="제목을 입력하세요." v-model="title">
        </div>
        <div class="board_textarea">
            <textarea v-model="content" placeholder="내용을 입력하세요."></textarea>
        </div>
        <div class="update_btns">
            <button class="colorbtn" @click="insertContents">글쓰기</button>
            <button class="back colorbtn" @click="$router.go(-1)">돌아가기</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8080';
axios.defaults.headers.common["Authorization"] = `Bearer ` + localStorage.getItem("token");

export default{
    name: 'boardsWrite',
    data(){
        return{
            title : this.title,
            content : this.content
        }
    },
    methods:{
        insertContents(){
            axios.post('/api/boards', JSON.stringify({"title" : this.title, "content" : this.content}), {
                headers: {
                    "Content-Type" : `application/json`
                }
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
                console.log(this.title, this.content)
            })
        }
    }
}
</script>