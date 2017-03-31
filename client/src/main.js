import Vue from 'vue';

import App from './Root';
import router from './router';
import htttpPlugin from './plugins/http';

Vue.use(htttpPlugin);

/* eslint-disable no-new */
new Vue({ // injects the Store into all components
  router, // make Router work with the application
  el: '#app',
  render: h => h(App),
});
