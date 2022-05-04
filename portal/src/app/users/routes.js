/* eslint-disable global-require */
const Main = (r) => require.ensure([], () => r(require('./main.vue')), 'group-users');
const List = (r) => require.ensure([], () => r(require('./components/list.vue')), 'group-users');
const Edit = (r) => require.ensure([], () => r(require('./components/edit.vue')), 'group-users');
const Form = (r) => require.ensure([], () => r(require('./components/form.vue')), 'group-users');

const children = [{
  name: 'newuser.form',
  path: 'new',
  component: Form,
  meta: { requiresAuth: true },
}, {
  name: 'users.edit',
  path: 'edit/:_id',
  component: Edit,
  meta: { requiresAuth: true },
}, {
  name: 'users.list',
  path: 'list',
  component: List,
  meta: { requiresAuth: true },
}];

export default [{
  children,
  name: 'users',
  path: '/users',
  component: Main,
  meta: { requiresAuth: true },
}];
