/**
 * main.js是项目的入口文件
 */

// 引入vue
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';
// 引入vue-resource
import VueResource from 'vue-resource';
// 引入相关组件
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

/**
 * 在这里引入外部的相关stylus文件
 * index.stylus@import其他的相关stylus文件
 * 需要注意的是即便在主文件index.stylus文件中@import了mixin文件
 * 也需要在组件中在单独引用
 * 详见https://github.com/ustbhuangyi/vue-sell/issues/18
 */
import './common/stylus/index.styl';

// 使用模块化机制编程，导入vueRouter和VueResource,要调用Vue.use()方法
Vue.use(VueRouter);
Vue.use(VueResource);

// 定义路由
let routes = [
  {path: '/', redirect: '/goods'}, // 默认到商品模块
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];

let router = new VueRouter({
  routes,
  // history: true,
  mode: 'history',
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
