// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import VueVideoPlayer from 'vue-video-player'
import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.config.productionTip = false
Vue.use(VueAxios, Axios)
Vue.use(ElementUI)
Vue.use(VueVideoPlayer)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
