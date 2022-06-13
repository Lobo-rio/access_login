import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/router'

const routes = [
  ...authRoutes,
  { path: '', redirect: '/login'}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
