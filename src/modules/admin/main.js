// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import 'babel-polyfill';
Vue.use(VueI18n);
 const i18n = new VueI18n({
  locale: localStorage.getItem('admin_lan') ? localStorage.getItem('admin_lan') : 'cn',
  messages: {
      'cn': require('./language/cn'),
      'en': require('./language/en')
  }
});

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.pageSizes = [6, 8, 15];

new Vue({
  el: '#appadmin',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');