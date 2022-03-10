<template>
    <div v-show="$store.state.modalOn" class="modal_wrapper">
        <div @click="toggle" class="modal_bg"></div>
        <div class="modal">
            <h1>학과 신규 등록</h1>
            <input type="text" v-model="name" placeholder="학과명">
            <button class="colorbtn" @click="newData">등록</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8085';

export default{
    name: 'insertSubjects',
    data(){
        return{
            name: ""
        }
    },
    methods:{
        toggle(){
            this.$store.commit('toggle');
        },
        newData(){
            axios.post('/api/subjects', {
                subjectName : this.name
            })
            .then((res)=>{
                console.log(res);
                this.$router.go();
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>