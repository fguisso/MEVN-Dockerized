const Main = () => import('./main.vue');
const List = () => import('./components/list.vue');
const Edit = () => import('./components/edit.vue');
const Form = () => import('./components/form.vue');

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
