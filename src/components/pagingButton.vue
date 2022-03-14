<template>
    <div class="paging_btn">
        <button @click="prevPage" v-show="this.professorPageCount !== 1">◀</button>
        <p>{{this.professorPageCount}}</p>
        <button @click="nextPage" v-show="indexPage">▶</button>
    </div>
</template>

<script>
export default{
    name: 'pagingButton',
    data(){

    }
}
</script>