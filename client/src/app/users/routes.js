// eslint-disable-next-line
const Users = r => require.ensure([], () => r(require('./main')), 'group-users');

export default [
  {
    name: 'users',
    path: '/users',
    component: Users,
    meta: { requiresAuth: true },
  },
];
