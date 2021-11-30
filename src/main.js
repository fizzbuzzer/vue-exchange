import Vue from 'vue';
import App from './App.vue';
import store from './store';
import monetary from './filters/monetary';

Vue.config.productionTip = false;

Vue.filter('monetary', monetary);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
