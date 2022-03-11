import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'subjects',
    component: () => import('../views/subjects/subjects.vue')
  },
  {
    path: '/subjects/:ids',
    name: 'updateSubjects',
    component: () => import('../views/subjects/updateSubjects.vue')
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('../views/students/students.vue')
  },
  {
    path: '/students/:ids',
    name: 'updateStudents',
    component: () => import('../views/students/updateStudents.vue')
  },
  {
    path: '/professors',
    name: 'professors',
    component: () => import('../views/professors/professors.vue')
  },
  {
    path: '/professors/:ids',
    name: 'updateProfessors',
    component: () => import('../views/professors/updateProfessors.vue')
  },
  {
    path: '/boards/',
    name: 'boards',
    component: () => import('../views/boards/boards.vue')
  },
  {
    path: '/boards/details/:ids',
    name: 'boardsDetail',
    component: () => import('../views/boards/boardsDetail.vue')
  },
  {
    path: '/boards-write',
    name: 'boardsWrite',
    component: () => import('../views/boards/boardsWrite.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
