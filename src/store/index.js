import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //modal
    modalOn : false,
    joinOn : false,
    
    //set datas
    students : [],
    subjects : [],
    profs : [],
    boards : [],

    //paging
    pageNum : 0,
    index : 10,

    //로그인 정보
    userOff : true,
    userId : "",

    token : ""
  },
  getters:{
    setPages: function(state){
      let startIndex = state.pageNum * state.index;
      let endIndex = (state.pageNum * state.index) + state.index;
      return state.boards.slice(startIndex, endIndex);
    },
    countPages: function(state){
      return Math.floor((state.boards.length) -1 / state.index) +1;
    }
  },
  mutations: {
    //login
    logIn(state, payload){
      state.userOff = false;
      state.token = payload.token;
      sessionStorage.setItem("token", payload.token);
      sessionStorage.setItem("username", state.userId);
    },
    logOut(state){
      sessionStorage.clear();
      state.userId = "";
      state.userOff = true;
    },

    //modal
    toggle : function (state){
      return state.modalOn = !state.modalOn;
    },
    toggleJoin : function (state){
      return state.joinOn = !state.joinOn;
    },

    //set datas
    setStudent(state, student){
      state.students = student;
    },
    setSubject(state, subject){
      state.subjects = subject;
    },
    setProf(state, prof){
      state.profs = prof;
    },
    setBoard(state, board){
      state.boards = board;
    },

    //paging
    sortBoards(state){
      function sortItems(v1,v2){
          return v2.id - v1.id;
      }
      state.boards.sort(sortItems);
      state.students.sort(sortItems);
    },
    prev(state){
      return state.pageNum--;
    },
    next(state){
      return state.pageNum++;
    }
  },
  actions: {
    getAll(context){
      axios.all([
        axios.get('/api/student')
        ,axios.get('/api/subject')
        ,axios.get('/api/prof')
        ,axios.get('/api/board')
      ])
      .then(axios.spread((stu, sub, prof, board)=>{
        context.commit('setStudent', stu.data);
        context.commit('setSubject', sub.data);
        console.log(sub);
        context.commit('setProf', prof.data);
        context.commit('setBoard', board.data);
      }))
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ['students', 'subjects', 'profs', 'token', 'userOff', 'userId']
    })
  ]
})
