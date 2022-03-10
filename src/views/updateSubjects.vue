<template>
    <div id="subjects_up" class="main">
        <div class="update_form">
            <h1>학과 정보 수정</h1>
            <div v-for="item in subject" :key="item.id">
                <label>학과명</label>
                <input type="text" v-model="item.subjectName">
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
        getData(){
            axios.get('/api/student/' + this.id)
            .then((res)=>{
                this.subject = res.data
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        updateData(){
            axios.put('/api/student', {
                id : this.id,
                subjectName : this.name
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
        this.getData();
    }
}
</script>