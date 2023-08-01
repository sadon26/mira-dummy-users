import { createRouter, createWebHistory } from 'vue-router';
import { Users } from '../views';

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
