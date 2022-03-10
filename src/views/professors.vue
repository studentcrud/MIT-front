<template>
    <div id="professors" class="main">
        <div>
            <ul class="lists tbody">
                <li v-for="item in this.$store.state.professors" :key="item.id">
                    <p class="short">{{item.id}}</p>
                    <p>{{item.professoressorName}}</p>
                    <p class="short">{{item.professoressorAge}}</p>
                    <p>{{item.subjectName}}</p>
                    <div class="short">
                        <button @click="goProfessorUp(item.id)"><img src="../assets/img/edit.png" alt="수정"></button>
                            <button @click="deleteProfessor(item.id)"><img src="../assets/img/remove.png" alt="삭제"></button>
                    </div>
                </li>
            </ul>
            <div class="update_btns">
                <button class="colorbtn" @click="toggle">등록</button>
            </div>
        </div>
        <insert-professors/>
    </div>
</template>


<script>

import insertProfessors from '../components/insertProfessors';
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default{
    name : 'professors',
    data(){
        return{
        }
    },
    components:{
        insertProfessors
    },
    methods:{
        goProfessorUp(num){
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
        deleteProfessor(num){
            axios.delete('/api/professors/' + num)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
                alert('외부 등록된 항목 : 삭제할 수 없습니다.');
            })
        }
    },
    created(){
        this.$store.dispatch('getAll');
    }
}
</script>