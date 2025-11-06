import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (el) {
        const headerOffset = 110; // matches scroll-padding-top
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        return { left: 0, top: y, behavior: 'smooth' };
      }
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0 };
  },
});

export default router;