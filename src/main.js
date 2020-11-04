import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Echarts from 'echarts'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 使用自己的插件
import plugin from '@/plugin/'
Vue.use(plugin)


Vue.use(ElementUI)

Vue.prototype.$echarts = Echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
