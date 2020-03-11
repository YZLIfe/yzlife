import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import './common/fonts/font_1666189_8ho7wsj27fd/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/swiper/dist/css/swiper.css'
import './assets/css/reset.css'
import 'lib-flexible/flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {
  Slider,
  Drawer,
  Message
} from 'element-ui';

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(VueAwesomeSwiper)
Vue.use(Drawer)
Vue.use(Slider)
Vue.use(Message)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')