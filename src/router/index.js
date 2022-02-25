import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BlogsDetails from '../components/dashboard/BlogsDetails.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta : {
      requiresAuth : false,
      title : 'Home | Blog Project'
  }
  },
  {
    path: '/details/:id',
    name: 'BlogsDetails',
    component: BlogsDetails,
    meta : {
      requiresAuth : false,
      title : 'Details | Blog Project'
  }

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
