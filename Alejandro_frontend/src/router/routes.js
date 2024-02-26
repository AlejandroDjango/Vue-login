const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('src/layouts/LoginLayout.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('src/layouts/RegisterLayout.vue'),
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('src/layouts/MainLayoutRegisterd.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue')
  }
]

export default routes

