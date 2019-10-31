import Vue from 'vue'
import Router from 'vue-router'
//懒加载，效率更高
const  detail = () => import('./views/detail.vue');
const  listItem = () => import('./views/listItem.vue');
const  blank = () => import('./views/blank.vue');
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: listItem
    }
    ,{
      path: '/detail',
      name: 'detail',
      component: detail
    }
    ,{
      path: '/blank',
      name: 'blank',
      component: blank
    }
  ]
})
