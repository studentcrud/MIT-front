<template>
    <div class="modal_wrapper">
        <div @click="toggleJoin" class="modal_bg"></div>
        <div class="modal">
            <h2>회원가입</h2>
            <input id="join_id_input" type="text" v-model="newId" style="display: inline-block" placeholder="ID">
            <button id="id_check" @click="idCheck">중복확인</button>
            <input type="password"  v-model="newPw" placeholder="비밀번호">
            <button class="colorbtn" @click="join">가입하기</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default{
    name: 'join',
    data(){
        return{
            newId : "",
            newPw : ""
        }
    },
    methods:{
        toggleJoin(){
            this.$store.commit('toggleJoin');
        },
        idCheck(){
            let id = this.newId;
            this.axios.post('/api/users/', JSON.stringify({"username": id}), {
                headers: {
                "Content-Type" : `application/json`
                }
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        join(){
            let id = this.newId;
            let pw = this.newPw;
            this.axios.post('/api/users/signup', JSON.stringify({"username": id, "password": pw}), {
                headers: {
                "Content-Type" : `application/json`
                }
            })
            .then((res)=>{
                console.log(res);
                this.router.push('/board');
            })
            .catch((err)=>{
                console.log(err);
            })
            .then(()=>{
                alert('회원가입이 완료되었습니다.');
                this.$router.go();
            })
        },
    }
}
</script>