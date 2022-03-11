<template>
    <div id="professors" class="main">
        <div>
            <ul class="lists tbody">
                <li v-for="item in this.professorIndex" :key="item.id">
                    <p class="short">{{item.id}}</p>
                    <p>{{item.professorName}}</p>
                    <p class="short">{{item.professorAge}}세</p>
                    <p>{{item.subjectName}}</p>
                    <div class="short">
                        <button @click="goProfessorUpdate(item.id)"><img src="../../assets/img/edit.png" alt="수정"></button>
                        <input style="display:inline-block; margin:0" v-model="selectData" :value="item.id" type="checkbox">
                    </div>
                </li>
            </ul>
            <div class="update_btns">
                <button class="colorbtn" @click="toggle">등록</button>
                <button class="colorbtn" @click="deleteProfessors">선택 삭제</button>
            </div>
            <div class="paging_btn">
                <button @click="prevPage" v-show="this.professorPageCount !== 1">◀</button>
                <p>{{this.professorPageCount}}</p>
                <button @click="nextPage" v-show="indexPage">▶</button>
            </div>
        </div>
        <insert-professors/>
    </div>
</template>


<script>

import insertProfessors from '../../components/insertProfessors';
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8080';

export default{
    name : 'professors',
    data(){
        return{
            professorIndex: [],
            professorPageCount: 1,
            selectData: []
        }
    },
    components:{
        insertProfessors
    },
    computed: {
        indexPage(){
            if(this.professorIndex.length < 8){
                return false;
            }else{
                return true;
            }
        }
    },
    methods:{
        goProfessorUpdate(num){
            this.$router.push({
                name: 'updateProfessors',
                params : {
                    ids : num
                }
            })
        },
        toggle(){
            this.$store.commit('toggle');
        },
        deleteProfessors(){
            axios.delete('/api/professors/', {
                data:{
                    'professors' : this.selectData
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
            axios.get('/api/professors/' + this.professorPageCount)
            .then((res)=>{
                this.professorIndex = res.data.data;
                console.log(res.data.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        prevPage(){
            this.professorPageCount--;
            this.loadPageIndex();
        },
        nextPage(){
            this.professorPageCount++;
            this.loadPageIndex();
        }
    },
    created(){
        this.loadPageIndex();
    }
}
</script>