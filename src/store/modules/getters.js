export default{
    setPages: function(state){
        let startIndex = state.pageNum * state.index;
        let endIndex = (state.pageNum * state.index) + state.index;
        return state.boards.slice(startIndex, endIndex);
    },
    countPages: function(state){
        return Math.floor((state.boards.length) -1 / state.index) +1;
    }
}