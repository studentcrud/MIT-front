<template>
    <div id="subjects" class="main">
        <div>
            <ul class="lists tbody">
                <li v-for="item in this.subjectIndex" :key="item.id">
                    <p class="short">{{item.id}}</p>
                    <p>{{item.subjectName}}</p>
                    <div class="short">
                        <button @click="goSubUp(item.id)"><img src="../../assets/img/edit.png" alt="수정"></button>
                        <input style="display:inline-block; margin:0" v-model="selectData" :value="item.id" type="checkbox">
                    </div>
                </li>
            </ul>
            <div class="update_btns">
                <button class="colorbtn" @click="toggle">등록</button>
                <button class="colorbtn" @click="deleteSubject">선택 삭제</button>
            </div>
                <div class="paging_btn">
                <button @click="prevPage" v-show="this.subjectPageCount !== 1">◀</button>
                <p>{{this.subjectPageCount}}</p>
                <button @click="nextPage" v-show="indexPage">▶</button>
            </div>
        </div>
        <insert-subjects/>
    </div>
</template>


<script>

import insertSubjects from '../../components/insertSubjects';
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8080';

export default{
    name : 'subjects',
    data(){
        return{
            subjectIndex: [],
            subjectPageCount: 1,
            selectData : []
        }
    },
    components:{
        insertSubjects
    },
    computed: {
        indexPage(){
            if(this.subjectIndex.length < 8){
                return false;
            }else{
                return true;
            }
        }
    },
    methods:{
        goSubUp(num){
            this.$router.push({
                name: 'updateSubjects',
                params : {
                    ids : num
                }
            })
        },
        toggle(){
            this.$store.commit('toggle');
        },
        deleteSubject(){
            axios.delete('/api/subjects/', {
                data:{
                    'subjects' : this.selectData
                }
            })
            .then((res)=>{
                console.log(res);
                this.$router.go();
            })
            .catch((err)=>{
                console.log(err);
                alert('외부 등록된 항목 : 삭제할 수 없습니다.');
            })
        },
        loadPageIndex(){
            axios.get('/api/subjects/' + this.subjectPageCount)
            .then((res)=>{
                this.subjectIndex = res.data.data;
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        prevPage(){
            this.subjectPageCount--;
            this.loadPageIndex();
        },
        nextPage(){
            this.subjectPageCount++;
            this.loadPageIndex();
        }
    },
    created(){
        this.loadPageIndex();
    }
}
</script>