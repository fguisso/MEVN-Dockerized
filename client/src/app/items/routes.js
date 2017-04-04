/* eslint-disable global-require */
const Main = r => require.ensure([], () => r(require('./main')), 'group-items');
const Edit = r => require.ensure([], () => r(require('./components/edit')), 'group-items');
const Form = r => require.ensure([], () => r(require('./components/form')), 'group-items');
const List = r => require.ensure([], () => r(require('./components/list')), 'group-items');

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
