import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import { Button, Skeleton ,Image,Lazyload,Grid, GridItem,Card,SubmitBar,Sidebar, SidebarItem } from 'vant';
Vue.use(Image);
Vue.use(Button);
Vue.use(Skeleton);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.use(SubmitBar);
Vue.use(Sidebar);
Vue.use(SidebarItem);


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
