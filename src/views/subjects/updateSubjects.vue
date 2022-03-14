<template>
    <div id="subjects_up" class="main">
        <div class="update_form">
            <h1>학과 정보 수정</h1>
            <div>
                <label>학과명</label>
                <input type="text" v-model="subject.subjectName">
            </div>
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
    name:'updateSubjects',
    data(){
        return{
            id : this.$route.params.ids,
            subject : []
        }
    },
    methods:{
        updateData(){
            console.log(this.subject.subjectName);
            axios.put('/api/subjects/' + this.id, {
                subjectName : this.subject.subjectName
            })
            .then((res)=>{
                console.log(res);
                this.$router.go(-1);
            })
            .catch((err)=>{
                console.log(err);
            })
        }  
    },
    created(){
        axios.get('/api/subject/' + this.id)
        .then((res)=>{
            this.subject = res.data
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>