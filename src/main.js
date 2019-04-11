import Vue from "vue";
import App from "./App.vue";
import NumberUtils from "./plugins/number-utils.js";
import "./registerServiceWorker";

Vue.use(NumberUtils);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
