import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {Spinner,Loadmore,Button } from 'mint-ui';
// import 'mint-ui/lib/index'
import 'mint-ui/lib/style.css'
import store from './store/index'
Vue.component(Spinner.name, Spinner);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);

Vue.prototype.$axios = axios;
Vue.prototype.mainUrl = 'http://anonymous.duizhankeji.com:8091';  // 服务器
// Vue.prototype.mainUrl = 'http://10.111.144.242:8091'; // SUST
// Vue.prototype.mainUrl = 'http://192.168.0.109:8090'

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
