<template>
    <div id="login">
        <router-link to="/login" class="loginbtn" v-if="this.$store.state.userOff"> 로그인 </router-link>
        <button class="loginbtn" v-if="!this.$store.state.userOff">{{this.$store.state.userId}} 님&nbsp;&nbsp;&nbsp;</button>
        <button class="loginbtn" v-if="!this.$store.state.userOff" @click="logOut"> 로그아웃 </button>
        <join v-show="$store.state.joinModalOn"/>
    </div>
</template>

<script>
import join from './join';

export default{
    name: 'login',
    data(){
        return{
        }
    },
    components:{
        join
    },
    methods:{
        logOut(){
            this.$store.commit('logOut');
        }
    }
}
</script>

<style>
#login_id,
#login_pw{
    width: 100px;
    padding: 4px;
    margin: 0;
    display: inline-block;
    margin-right: 8px;
    outline: none;
}

#login{
    display: flex;
    align-items: center;
}

</style>