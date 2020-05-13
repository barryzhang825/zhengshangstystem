// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import Es6Promise from 'es6-promise'
import FastClick from 'fastclick'
import {fetchGet,fetchFormPost,fetchPost,fetchPut,fetchDelete} from './common/common.js';
Vue.prototype.$get = fetchGet;
Vue.prototype.$form = fetchFormPost;
Vue.prototype.$post = fetchPost;
Vue.prototype.$put = fetchPut;
Vue.prototype.$delete = fetchDelete;
Vue.use(ElementUI);
FastClick.attach(document.body)
Es6Promise.polyfill();
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
