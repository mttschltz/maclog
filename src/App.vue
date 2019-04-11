<template>
  <div id="app">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-size-50">
        <div class="ml-fake-card">
          <h1 class="md-display-3 ml-h1">MacLog</h1>
          <p class="md-subheading">Log and count your macronutrients</p>
        </div>
        <!-- Target -->
        <Target :target="target" />
        <!-- Meals -->
        <div class="ml-fake-card">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-90">
              <h2 class="md-title">Meals</h2>
            </div>
            <div class="md-layout-item md-size-10">
              <MdButton
                v-if="meals.length > 1"
                @click="delAll"
                class="md-icon-button"
              >
                <MdIcon>delete_sweep</MdIcon>
              </MdButton>
            </div>
          </div>
          <Meals v-bind="{ mealsHistory, meals }" />
          <div class="ml-align-right">
            <MdButton @click="add" class="md-fab md-mini md-accent">
              <MdIcon>add</MdIcon>
            </MdButton>
          </div>
        </div>
        <!-- Remaining -->
        <Remaining v-bind="{ meals, remaining, target }" />
        <!-- Meals history -->
        <div class="ml-fake-card">
          <MdButton
            @click="showHistory = !showHistory"
            class="md-mini md-plain ml-meals-history-button"
          >
            <span>History</span>
            <MdIcon v-if="!showHistory">expand_more</MdIcon>
            <MdIcon v-if="showHistory">expand_less</MdIcon>
          </MdButton>
          <div v-if="showHistory" class="ml-history">
            <p v-if="!mealsHistory.length">No meal history</p>
            <MdList>
              <MdListItem
                v-for="(meal, index) in mealsHistoryOrdered"
                v-bind:key="index"
              >
                <div class="md-list-item-text ml-history-item-text">
                  <span>{{ meal.name || "Unnamed Meal" }}</span>
                  <span class="ml-history-macros">
                    <span>Carbs: {{ meal.carbs }}</span> |
                    <span>Protein: {{ meal.protein }}</span> |
                    <span>Fat: {{ meal.fat }}</span>
                  </span>
                </div>
                <md-button
                  v-if="!showPermDel(index)"
                  @click="togglePermDel(index)"
                  class="md-icon-button md-list-action"
                >
                  <md-icon>delete</md-icon>
                </md-button>
                <div v-if="showPermDel(index)" class="ml-perm-del-menu">
                  <span class="md-body-1">Are you sure?</span>
                  <md-button
                    @click="permDel(index)"
                    class="md-primary md-list-action"
                  >
                    Yes
                  </md-button>
                  <md-button
                    @click="togglePermDel(index)"
                    class="md-list-action"
                  >
                    Cancel
                  </md-button>
                </div>
                <md-button
                  v-if="!showPermDel(index)"
                  @click="restore(index)"
                  class="md-icon-button md-list-action md-raised md-accent"
                >
                  <md-icon>cached</md-icon>
                </md-button>
              </MdListItem>
            </MdList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

// Utils
import Storage from "vue-ls";
Vue.use(Storage, {
  namespace: "maclog__",
  storage: "local"
});

// Styles
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";

// Components
import {
  MdButton,
  MdCard,
  MdDivider,
  MdField,
  MdIcon,
  MdList
} from "vue-material/dist/components";
import Meals from "./components/Meals.vue";
import Remaining from "./components/Remaining.vue";
import Target from "./components/Target.vue";

Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdDivider);
Vue.use(MdField);
Vue.use(MdIcon);
Vue.use(MdList);

export default {
  components: { Meals, Remaining, Target },
  name: "MacLog",
  data() {
    return {
      showHistory: false,
      target: {
        carbs: null,
        protein: null,
        fat: null
      },
      meals: [],
      mealsHistory: []
    };
  },
  mounted() {
    const target = Vue.ls.get("target");
    target instanceof Object && (this.target = target);

    const meals = Vue.ls.get("meals");
    meals instanceof Array && (this.meals = meals);

    const mealsHistory = Vue.ls.get("mealsHistory");
    mealsHistory instanceof Array && (this.mealsHistory = mealsHistory);
  },
  watch: {
    target: {
      deep: true,
      handler(newTarget) {
        Vue.ls.set("target", newTarget);
      }
    },
    meals: {
      deep: true,
      handler(newMeals) {
        Vue.ls.set("meals", newMeals);
      }
    },
    mealsHistory: {
      deep: true,
      handler(newMealsHistory) {
        Vue.ls.set("mealsHistory", newMealsHistory);
      }
    }
  },
  computed: {
    eatenCarbs() {
      return this.meals.reduce((acc, meal) => acc + meal.carbs, 0);
    },
    eatenProtein() {
      return this.meals.reduce((acc, meal) => acc + meal.protein, 0);
    },
    eatenFat() {
      return this.meals.reduce((acc, meal) => acc + meal.fat, 0);
    },
    remainingCarbs() {
      return Math.round(this.target.carbs - this.eatenCarbs);
    },
    remainingProtein() {
      return Math.round(this.target.protein - this.eatenProtein);
    },
    remainingFat() {
      return Math.round(this.target.fat - this.eatenFat);
    },
    remaining() {
      return {
        carbs: this.remainingCarbs,
        protein: this.remainingProtein,
        fat: this.remainingFat
      };
    },
    mealsHistoryOrdered() {
      return this.mealsHistory.slice().reverse();
    }
  },
  methods: {
    add() {
      this.meals.push({
        carbs: null,
        protein: null,
        fat: null,
        showPermDel: false
      });
    },
    delAll() {
      this.mealsHistory.push(...this.meals.splice(0));
    },
    permDel(index) {
      this.mealsHistory.splice(index, 1);
    },
    restore(index) {
      const toRestore = this.mealsHistory.splice(index, 1)[0];
      toRestore.showPermDel = false;
      this.meals.push(toRestore);
    },
    showPermDel(index) {
      return this.mealsHistory[index].showPermDel;
    },
    togglePermDel(index) {
      this.mealsHistory[index].showPermDel = !this.mealsHistory[index]
        .showPermDel;
    }
  }
};
</script>

<style lang="scss">
.ml-h1 {
  margin-bottom: 0;
}
.ml-fake-card {
  padding: 16px; // Mimic MdCard padding to keep elements aligned
}
.ml-fake-input {
  margin: 0;
}
.md-field.md-theme-default.ml-fake-field {
  &.ml-fake-field--bg {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:after {
    background-color: transparent;
  }
}
.ml-field-container {
  .md-field {
    margin-bottom: 5px;
  }
  .md-input {
    max-width: 100%;
  }
}
.ml-align-right {
  text-align: right;
  padding-right: 2px; // Align Add button with Delete buttons
}
.ml-meals-history-button {
  margin-left: -7px; // Align
  .md-button-content > * {
    vertical-align: middle;
  }
}
.ml-history-macros {
  color: #999;
}
.ml-history-item-text {
  min-width: 250px;
}
.ml-history {
  display: flex; // Don't expand to 100%
}
.ml-perm-del-menu {
  display: flex;
  align-items: center;
}
</style>
