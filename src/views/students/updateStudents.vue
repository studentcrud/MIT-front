<template>
    <div id="students_up" class="main">
        <div class="update_form">
            <h1>학생 정보 수정</h1>
            <div>
                <label>이름</label>
                <input type="text" v-model="student.studentName">
                <label>나이</label>
                <input type="text" v-model="student.studentAge">
                <label>주소</label>
                <input type="text" v-model="student.studentAddress">
            </div>
            <label>학과</label>
            <select v-model="subject">
                <option value="" selected hidden>학과를 선택하세요</option>
                <option v-for="item in this.$store.state.subjects" :key="item.id" :value="item.subjectName">{{item.subjectName}}</option>
            </select>
            <label>지도교수</label>
            <select v-model="professor">
                <option value="" selected hidden>지도교수를 선택하세요</option>
                <option v-show="subject == item.subjectName" v-for="item in this.$store.state.professors" :key="item.id" :value="item.professorName">{{item.subjectName}} : {{item.professorName}} 교수</option>
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
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default{
    name:'updateStudents',
    data(){
        return{
            id : this.$route.params.ids,
            subject : "",
            professor : "",
            student : []
        }
    },
    methods:{
        updateData(){
            axios.put('/api/students/' + this.id, {
                studentName : this.student.studentName,
                studentAge : this.student.studentAge,
                studentAddress : this.student.studentAddress,
                professorName : this.professor,
                subjectname : this.subject
            })
            .then((res)=>{
                console.log(res);
                this.$router.push('/students');
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        axios.get('/api/student/' + this.id)
        .then((res)=>{
            this.student = res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>