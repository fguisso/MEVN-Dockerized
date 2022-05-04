/* eslint-disable global-require */
const Main = (r) => require.ensure([], () => r(require('./main.vue')), 'group-items');
const Edit = (r) => require.ensure([], () => r(require('./components/edit.vue')), 'group-items');
const Form = (r) => require.ensure([], () => r(require('./components/form.vue')), 'group-items');
const List = (r) => require.ensure([], () => r(require('./components/list.vue')), 'group-items');

const children = [{
  name: 'items.edit',
  path: 'edit/:_id',
  component: Edit,
  meta: { requiresAuth: true },
}, {
  name: 'newitem.form',
  path: 'new',
  component: Form,
  meta: { requiresAuth: true },
}, {
  name: 'items.list',
  path: 'list',
  component: List,
  meta: { requiresAuth: true },
}];

export default [{
  children,
  name: 'items',
  path: '/items',
  component: Main,
  meta: { requiresAuth: true },
}];
