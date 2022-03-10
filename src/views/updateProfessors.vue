<template>
    <div id="professors_up" class="main">
        <div class="update_form">
            <h1>교수 정보 수정</h1>
            <div v-for="item in professor" :key="item.professorId">
                <label>이름</label>
                <input type="text" v-model="item.professorName">
                <label>나이</label>
                <input type="text" v-model="item.professorAge">
            </div>
            <label>학과</label>
            <select v-model="subject">
                <option value="" selected hidden>학과 정보를 선택하세요</option>
                <option v-for="item in this.$store.state.subjects" :key="item.subjectId" :value="item.subjectName">{{item.subjectName}}</option>
            </select>
            <div class="update_btns">
                <button @click="updateData">등록</button>
                <button class="back" @click="$router.go(-1)">돌아가기</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.165:8889';

export default{
    name:'updateProfessors',
    data(){
        return{
            id : this.$route.params.ids,
            subject : "",
            professor : []
        }
    },
    methods:{
        getData(){
            axios.get('/api/Professor/' + this.id)
            .then((res)=>{
                this.professor = res.data
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        updateData(){
            axios.put('/', {
                professorId : this.id,
                professorName : this.name,
                professorAge : this.age,
                professorSubject : this.subject
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
            console.log(this.sub)
        }  
    },
    created(){
        this.getData();
    }
}
</script>