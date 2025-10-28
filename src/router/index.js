import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import Auth from '../views/Auth.vue';
import Dashboard from '../views/Dashboard.vue';
import TicketManagement from '../views/TicketManagement.vue';

const routes = [
  { path: '/', component: Landing },
  { path: '/auth/:action(login|signup)', component: Auth },
  { path: '/dashboard', component: Dashboard },
  { path: '/tickets', component: TicketManagement },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;