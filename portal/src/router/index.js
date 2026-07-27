import { createRouter, createWebHistory } from 'vue-router';
import beforeEach from './beforeEach';
import app from '../app';

const routes = [...app];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach(beforeEach);

export default router;
