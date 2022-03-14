import axios from 'axios';
import { getAllDatas } from '../../api/index.js';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default {
    getAll(context) {
        getAllDatas()
        .then(axios.spread((students, subjects, professors) => {
            context.commit('setStudent', students.data);
            context.commit('setSubject', subjects.data);
            context.commit('setProfessor', professors.data);
        }))
        .catch((err) => {
            console.log(err);
        })
    },
    
}