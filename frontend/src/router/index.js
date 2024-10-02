// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'
import store from '../store' // Asegúrate de importar el store

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  },
  {
    path: '/logout',
    name: 'Logout',
    component: {
      template: '<div></div>',
      beforeRouteEnter(to, from, next) {
        store.dispatch('logout'); // Asegúrate de que este método esté definido en tu store
        next('/login');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guarda de navegación
router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verifica si el usuario no está autenticado
    // store.dispatch('checkAuth');
    let estaLogueado= store.getters['isAuthenticated']
    if (estaLogueado !=true) {
      // Redirige a la página de login
      next('/login');
    } else {
      next(); // Permite el acceso
    }
  } else {
    next(); // Permite el acceso si no se requiere autenticación
  }
});

export default router;
