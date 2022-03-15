<template>
    <div class="modal_wrapper">
        <div @click="toggleJoin" class="modal_bg"></div>
        <div class="modal">
            <h2>회원가입</h2>
            <input id="join_id_input" type="text" v-model="insertId" placeholder="ID">
            <p id="id_check_message">{{idCheckMessage}}</p>
            <input id="join_pw_input" type="password"  v-model="insertPw" placeholder="비밀번호">
            <button class="colorbtn" @click="join">가입하기</button>
        </div>
    </div>
</template>

<style>
#join_id_input{
    display: inline-block;
}

#id_check_message{
    font-size:11px;
    text-align:right;
}
</style>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default{
    name: 'join',
    data(){
        return{
            insertId : "",
            insertPw : "",
            idCheckMessage : "ID를 입력하세요."
        }
    },
    watch:{
        insertId: function(){
            this.axios.get('/api/users/check', JSON.stringify({"username": this.insertId}), {
                headers: {
                "Content-Type" : `application/json`
                }
            })
            .then((res)=>{
                this.idCheckMessage = res.data;
            })
            .catch((err)=>{
                this.idCheckMessage = err.data;
            })
        }
    },
    methods:{
        toggleJoin(){
            this.$store.commit('toggleJoin');
        },
        join(){
            let id = this.insertId;
            let pw = this.insertPw;
            if(id != "" || pw != ""){
                this.axios.post('/api/users/signup', JSON.stringify({"username": id, "password": pw}), {
                    headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ` + localStorage.getItem("token")
                    }
                })
                .then((res)=>{
                    console.log(res);
                    alert('회원가입이 완료되었습니다.');
                    this.$router.replace('/');
                    this.$store.commit('toggleJoin');
                })
                .catch((err)=>{
                    console.log(err);
                })
            }else{
                alert('아이디와 비밀번호를 입력하세요.');
            }
        },
    }
}
</script>