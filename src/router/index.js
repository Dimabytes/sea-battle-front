import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/waitAllConnected',
    name: 'WaitAllConnected',
    component: () => import(/* webpackChunkName: "WaitAllConnected" */ '../views/WaitAllConnected.vue'),
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import(/* webpackChunkName: "setup" */ '../views/Setup.vue'),
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import(/* webpackChunkName: "about" */ '../views/Game.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
