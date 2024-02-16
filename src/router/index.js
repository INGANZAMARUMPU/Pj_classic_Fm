import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import Propos from '../views/Propos.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',//memories
    name:Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/Propos',
    name: 'Propos',
    component: Propos
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
