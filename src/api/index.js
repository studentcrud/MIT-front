import axios from 'axios';

const config = {
    baseURL: 'http://172.16.28.167:8084'
}

axios.defaults.headers.common["Authorization"] = `Bearer ` + localStorage.getItem("token");
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//get
export function getAllDatas() {
    return axios.all([
            axios.get(`${config.baseURL}/api/students`),
            axios.get(`${config.baseURL}/api/subjects`),
            axios.get(`${config.baseURL}/api/professors`)
        ])
}

export function getSubjectIndex(payload) {
    return axios.get('/api/subjects/' + payload)
}

export function getStudentIndex(payload) {
    return axios.get('/api/students/' + payload)
}

export function getProfessorIndex(payload) {
    return axios.get('/api/professors/' + payload)
}

export function getBoardIndex(payload) {
    return axios.get('/api/boards/' + payload)
}

//post

export function insertProfessor(name, age, subject) {
    return axios.post('/api/professors', {
        professorName : name,
        professorAge : age,
        subjectName : subject
    })
}

//put


//delete
export function deleteSubject(payload){
    return axios.delete('/api/subjects/',{
        data:{
            "subjects" : payload
        }
    })
}

export function deleteStudent(payload){
    return axios.delete('/api/students', {
        data:{
            "students" : payload
        }
    })
}

export function deleteProfessor(payload){
    return axios.delete('/api/professors/',{
        data:{
            "professors" : payload
        }
    })
}