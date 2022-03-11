import axios from 'axios';
//axios.defaults.baseURL = 'http://172.16.28.167:8084';
//import state from '../store/modules/state';


const config = {
    baseURL: 'http://172.16.28.167:8080'
}

function getAllDatas() {
    return axios.all([
            axios.get(`${config.baseURL}/api/students`),
            axios.get(`${config.baseURL}/api/subjects`),
            axios.get(`${config.baseURL}/api/professors`)
        ])
}

export{
    getAllDatas
}