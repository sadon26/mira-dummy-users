import { Users } from '../views';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    alias: '/users',
    name: 'Home',
    component: Users
  }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
