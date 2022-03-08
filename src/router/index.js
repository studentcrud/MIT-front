import Vue from 'vue'
import VueRouter from 'vue-router'
import subjects from '../views/subjects.vue'
import students from '../views/students.vue'
import profs from '../views/profs.vue'
import board from '../views/board.vue'
import login from '../views/login_page.vue'

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
    path: '/profs',
    name: 'profs',
    component: profs
  },
  {
    path: '/board',
    name: 'board',
    component: board
  },
  {
    path: '/board_detail/:ids',
    name: 'board_detail',
    component: () => import('../views/board_detail.vue')
  },
  {
    path: '/subjects_up/:ids',
    name: 'subjects_up',
    component: () => import('../components/subjects_up.vue')
  },
  {
    path: '/students_up/:ids',
    name: 'students_up',
    component: () => import('../components/students_up.vue')
  },
  {
    path: '/profs_up/:ids',
    name: 'profs_up',
    component: () => import('../components/profs_up.vue')
  },
  {
    path: '/board_write',
    name: 'board_write',
    component: () => import('../components/board_write.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
