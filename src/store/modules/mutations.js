export default {
    //login
    logIn(state, payload) {
        state.userOff = false;
        state.token = payload.token;
        sessionStorage.setItem("token", payload.token);
        sessionStorage.setItem("username", state.userId);
    },
    logOut(state) {
        sessionStorage.clear();
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
        state.professoressors = payload;
    },
    setBoard(state, payload) {
        state.boards = payload;
    },

    //paging
    sortBoards(state) {
        function sortItems(v1, v2) {
            return v2.id - v1.id;
        }
        state.boards.sort(sortItems);
        state.students.sort(sortItems);
    },
    prev(state) {
        return state.pageNum--;
    },
    next(state) {
        return state.pageNum++;
    }
}