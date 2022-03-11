<template>
    <div id="students" class="main">
        <div>
            <ul class="lists tbody">
                <li v-for="item in this.studentIndex" :key="item.id">
                    <p class="short">{{item.id}}</p>
                    <p>{{item.studentName}}</p>
                    <p class="short">{{item.studentAge}}세</p>
                    <p>{{item.studentAddress}}</p>
                    <p>{{item.subjectName}}</p>
                    <p>{{item.professorName}}</p>
                    <div class="short">
                        <button @click="goStudentUpdate(item.id)"><img src="../../assets/img/edit.png" alt="수정"></button>
                        <input style="display:inline-block; margin:0" v-model="selectData" :value="item.id" type="checkbox">
                    </div>
                </li>
            </ul>
            <div class="update_btns">
                <button class="colorbtn" @click="toggle">등록</button>
                <button class="colorbtn" @click="deleteStudents">선택 삭제</button>
            </div>
            <div class="paging_btn">
                <button @click="prevPage" v-show="!this.studentPageCount == 1">◀</button>
                <p>{{this.studentPageCount}}</p>
                <button @click="nextPage" v-show="indexPage">▶</button>
            </div>
        </div>
        <insert-students/>
    </div>
</template>


<script>

import insertStudents from '../../components/insertStudents';
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default{
    name : 'students',
    data(){
        return{
            studentIndex: [],
            studentPageCount : 1,
            selectData: []
        }
    },
    components:{
        insertStudents
    },
    computed:{
        indexPage(){
            if(this.studentIndex.length < 8){
                return false;
            }else{
                return true;
            }
        }
    },
    methods:{
        goStudentUpdate(num){
            this.$router.push({
                name: 'updateStudents',
                params : {
                    ids : num
                }
            })
        },
        toggle(){
            this.$store.commit('toggle');
        },
        deleteStudents(){
            axios.delete('/api/students', {
                data:{
                    "students" : this.selectData
                }
            })
            .then((res)=>{
                console.log(res);
                this.$router.go();
            })
            .catch((err)=>{
                alert(err)
            })
        },
        loadPageIndex(){
            axios.get('/api/students/' + this.studentPageCount)
            .then((res)=>{
                this.studentIndex = res.data.data;
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        prevPage(){
            this.studentPageCount--;
            this.loadPageIndex();
        },
        nextPage(){
            this.studentPageCount++;
            this.loadPageIndex();
        }
    },
    created(){
        this.loadPageIndex();
    }
}
</script>