import { createApp } from 'vue';

import App from './Root.vue';
import router from './router';
import httpPlugin from './plugins/http';
import store from './store';

createApp(App)
  .use(router)
  .use(store)
  .use(httpPlugin)
  .mount('#app');
