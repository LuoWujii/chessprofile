import HomePage from '@/views/HomePage.vue'
import Profile from '@/views/Profile.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/profile', component: Profile },
  { path: '/profile/:search', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
