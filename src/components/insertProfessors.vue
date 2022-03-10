<template>
    <div v-show="$store.state.modalOn" class="modal_wrapper">
        <div @click="toggle" class="modal_bg"></div>
        <div class="modal">
            <h1>교수 정보 신규 등록</h1>
            <input type="text" v-model="name" placeholder="이름">
            <input type="text" v-model="age" placeholder="나이">
            <select v-model="subject">
                <option value="" selected hidden>학과 정보를 선택하세요</option>
                <option v-for="item in this.$store.state.subjects" :key="item.subjectId" :value="item.subjectId">{{item.subjectName}}</option>
            </select>
            <button class="colorbtn">등록</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.165:8889';

export default{
    name: 'insertProfessors',
    data(){
        return{
            name: "",
            age: "",
            subject: ""
        }
    },
    methods:{
        toggle(){
            this.$store.commit('toggle');
        },
        newData(){
            axios.post('/', {
                professorName : this.name,
                professorAge : this.age,
                professorSub : this.subject
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