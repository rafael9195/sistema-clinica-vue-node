import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import EditAppointmentView from '../views/EditAppointmentView.vue'

const routes = [
  { path: '/', redirect: '/login' }, // Adicionado para segurança
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'editAppointment',
    component: EditAppointmentView,
    meta: { requiresAuth: true }
  },
  { path: '/:catchAll(.*)', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// --- GUARDA DE ROTAS ATUALIZADO E CORRIGIDO ---
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token;

  // Se a rota precisa de login E o usuário NÃO está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }); // Manda para a página de login
  } 
  // Se a rota é login ou registro E o usuário JÁ está autenticado
  else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next({ name: 'dashboard' }); // Manda para o dashboard
  } 
  // Em todos os outros casos, permite a navegação
  else {
    next();
  }
});

export default router