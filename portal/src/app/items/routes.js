const Main = () => import('./main.vue');
const Edit = () => import('./components/edit.vue');
const Form = () => import('./components/form.vue');
const List = () => import('./components/list.vue');

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
