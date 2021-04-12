import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/auth/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/auth/SignUp.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
