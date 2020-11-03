import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 使用自己的插件
import plugin from '@/plugin/'
Vue.use(plugin)


Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
