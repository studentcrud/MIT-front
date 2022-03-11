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
                <option value="" selected hidden>학과 정보를 선택하세요</option>
                <!--<option v-for="item in this.$store.state.subjects" :key="item.subject_id" :value="item.subject_name">{{item.subject_name}}</option>-->
                <option v-for="item in this.$store.state.professors" :key="item.id" :value="item.subjectName">{{item.subjectName}} : {{item.professorsName}} 교수</option>
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
    name:'updateStudents',
    data(){
        return{
            id : this.$route.params.ids,
            subject : "",
            student : []
        }
    },
    methods:{
        updateData(){
            axios.put('/api/students/' + this.id, {
                studentName : this.student.studentName,
                studentAge : this.student.studentAge,
                studentAddress : this.student.studentAddress,
                subjectname : this.subject
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