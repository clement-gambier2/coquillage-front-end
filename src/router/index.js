import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import More from '../views/MoreView.vue'
import Add from '../views/AddView.vue'
import MyAvailabilities from '../views/MyAvailabilitiesView.vue'
import Name from '../views/NamesView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/more',
    name: 'more',
    component: More
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
  {
    path: '/names',
    name: 'names',
    component: Name
  },
  {
    path: '/my-availabilities',
    name: 'availabilities',
    component: MyAvailabilities
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
