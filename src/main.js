import Vue from 'vue';
import App from './App.vue';
import './app.pcss';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.component('RecycleScroller', RecycleScroller);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
