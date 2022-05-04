import Vue from 'vue';

import App from './Root.vue';
import router from './router';
import htttpPlugin from './plugins/http';
import store from './store';

Vue.use(htttpPlugin);

/* eslint-disable-next-line */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
