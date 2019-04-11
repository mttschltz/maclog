export default {
  install(Vue) {
    Vue.prototype.$calories = macros => {
      const calories = 4 * macros.carbs + 4 * macros.protein + 9 * macros.fat;
      return Math.round(calories);
    };

    Vue.prototype.$roundWhole = num => Math.round(num);
    Vue.prototype.$roundOne = num => num.toFixed(1);
    Vue.prototype.$toPercent = ratio => (ratio * 100).toFixed(1);
  }
};
