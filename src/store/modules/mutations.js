export default {
    //login
    logIn(state, payload) {
        state.userOff = false;
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
        localStorage.setItem("username", state.userId);
    },
    logOut(state) {
        localStorage.clear();
        state.userId = "";
        state.userOff = true;
    },

    //modal toggle
    toggle: function (state) {
        return state.modalOn = !state.modalOn;
    },
    toggleJoin: function (state) {
        return state.joinModalOn = !state.joinModalOn;
    },

    //set datas
    setStudent(state, payload) {
        state.students = payload;
    },
    setSubject(state, payload) {
        state.subjects = payload;
    },
    setProfessor(state, payload) {
        state.professors = payload;
    }
}