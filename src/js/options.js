import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './../components/App.vue';
import Settings from './../components/Settings.vue';

const routes = [
  { path: '/', component: Settings },
  { path: '/:pathMatch(.*)*', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');