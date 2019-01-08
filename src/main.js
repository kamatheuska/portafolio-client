import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.filter('sliceString', function (str) {
    if (!str || str.length === 0) {
        return '***NO DESCRIPTION***'
    }
    return str.slice(0, 60) + '...'
})

Vue.config.productionTip = false

const app = new Vue({
    router,
    store,
    ...App
})

if (process.env.NODE_ENV !== 'production') {
    setTimeout(() => { app.$mount('#app') }, 500)
} else {
    app.$mount('#app')
}
