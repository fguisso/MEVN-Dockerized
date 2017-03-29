// eslint-disable-next-line
const Dashboard = r => require.ensure([], () => r(require('./main')), 'group-dashboard');

export default [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
  }, {
    name: 'catchall',
    path: '*',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];
