// eslint-disable-next-line
const Users = r => require.ensure([], () => r(require('./main')), 'group-items');

export default [
  {
    name: 'items',
    path: '/items',
    component: Users,
    meta: { requiresAuth: true },
  },
];
