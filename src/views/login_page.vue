<template>
    <div class="main">
        <h2>로그인</h2>
        <button class="loginbtn" v-if="this.$store.state.userOff" @click="toggleJoin"> 회원가입 </button>
        <input type="text" v-model="myId" maxlength="20" placeholder="ID">
        <input type="password" v-model="myPw" maxlength="20" placeholder="비밀번호">
        <button class="colorbtn" @click="logIn">로그인</button>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default{
    name: 'login_page',
    data(){
        return{
            myId : "",
            myPw : ""
        }
    },
    methods:{
        toggleLogIn(){
            this.$store.commit('toggleLogIn');
        },
        toggleJoin(){
            this.$store.commit('toggleJoin');
        },
        logIn(){
            let id = this.myId;
            let pw = this.myPw;
            this.$store.state.userId = this.myId;
            this.axios.post('/api/users/login', JSON.stringify({"username": id, "password": pw}), {
                headers: {
                "Content-Type" : `application/json`
                }
            })
            .then((res)=>{
                console.log(res);
                this.$store.commit('logIn', res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        },
    }
}
</script>