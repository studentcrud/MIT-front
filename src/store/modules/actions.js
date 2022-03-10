import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.28.167:8084';

export default {
    getAll(context) {
        axios.all([
                axios.get('/api/students'),
                axios.get('/api/subject'),
                axios.get('/api/professors'),
                axios.get('/api/boards')
            ])
            .then(axios.spread((students, subjects, professors, boards) => {
                context.commit('setStudent', students.data);
                context.commit('setSubject', subjects.data);
                context.commit('setProfessor', professors.data);
                context.commit('setBoard', boards.data);
            }))
            .catch((err) => {
                console.log(err);
            })
    }
}