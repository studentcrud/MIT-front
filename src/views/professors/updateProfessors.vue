<template>
    <div id="professors_up" class="main">
        <div class="update_form">
            <h1>교수 정보 수정</h1>
            <div>
                <label>이름</label>
                <input type="text" v-model="professor.professorName">
                <label>나이</label>
                <input type="text" v-model="professor.professorAge">
            </div>
            <label>학과</label>
            <select v-model="subject">
                <option value="" selected hidden>학과 정보를 선택하세요</option>
                <option v-for="item in this.$store.state.subjects" :key="item.subjectId" :value="item.subjectName">{{item.subjectName}}</option>
            </select>
            <div class="update_btns">
                <button class="colorbtn" @click="updateData">등록</button>
                <button class="back colorbtn" @click="$router.go(-1)">돌아가기</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8080';

export default{
    name:'updateProfessors',
    data(){
        return{
            id : this.$route.params.ids,
            professor : [],
            subject : ""
        }
    },
    methods:{
        updateData(){
            axios.put('/api/professors/' + this.id, {
                professorName : this.professor.professorName,
                professorAge : this.professor.professorAge,
                subjectName : this.subject
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
        axios.get('/api/professor/' + this.id)
        .then((res)=>{
            this.professor = res.data
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>