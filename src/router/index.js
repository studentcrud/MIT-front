import Vue from 'vue'
import VueRouter from 'vue-router'
import subjects from '../views/subjects.vue'
import students from '../views/students.vue'
import professors from '../views/professors.vue'
import updateSubjects from '../views/updateSubjects.vue'
import updateStudents from '../views/updateStudents.vue'
import updateProfessors from '../views/updateProfessors.vue'
import boards from '../views/boards.vue'
import login from '../views/loginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'subjects',
    component: subjects
  },
  {
    path: '/students',
    name: 'students',
    component: students
  },
  {
    path: '/professors',
    name: 'professors',
    component: professors
  },
  {
    path: '/subjects/:ids',
    name: 'updateSubjects',
    component: updateSubjects
  },
  {
    path: '/students/:ids',
    name: 'updateStudents',
    component: () => updateStudents
  },
  {
    path: '/professors/:ids',
    name: 'updateProfessors',
    component: () => updateProfessors
  },
  {
    path: '/boards',
    name: 'boards',
    component: boards
  },
  {
    path: '/boards/:ids',
    name: 'boardsDetail',
    component: () => import('../views/boardsDetail.vue')
  },
  {
    path: '/boards-write',
    name: 'boardsWrite',
    component: () => import('../views/boardsWrite.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
