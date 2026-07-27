const Dashboard = () => import('./main.vue');

export default [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
  }, {
    name: 'catchall',
    path: '/:pathMatch(.*)*',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];
