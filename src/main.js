import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

//global variable 
Vue.prototype.$name = 'Dylan'

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
