
const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('layouts/RegisteLayout.vue'),
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
