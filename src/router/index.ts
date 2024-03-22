import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      name: 'auth',
      component: () => import('../views/auth.vue')
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/index.vue')
    },
    {
      path: '/validations',
      name: 'validations',
      component: () => import('../views/validation.vue')
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: () => import('../views/vacancy.vue')
    },
    {
      path: '/vacancies/:id',
      name: 'applications',
      component: () => import('../views/application.vue')
    },
  ]
})

export default router
