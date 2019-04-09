<template>
  <div id="app">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-size-50">
        <div class="ml-fake-card">
          <h1 class="md-display-3 ml-h1">MacLog</h1>
          <p class="md-subheading">Log and count your macronutrients</p>
        </div>
        <!-- Target -->
        <Target :target="target" :calories="targetCalories" />
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
          <Meals v-bind="{ calories, mealsHistory, meals }" />
          <div class="ml-align-right">
            <MdButton @click="add" class="md-fab md-mini md-accent">
              <MdIcon>add</MdIcon>
            </MdButton>
          </div>
        </div>
        <!-- Remaining -->
        <Remaining
          v-bind="{ target, targetCalories, remaining, remainingCalories }"
        />
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
          <div v-if="showHistory">
            <ul>
              <li v-for="(meal, index) in mealsHistory" v-bind:key="index">
                <span>Name: {{ meal.name }}</span> /
                <span>Carbs: {{ meal.carbs }}</span> /
                <span>Protein: {{ meal.protein }}</span> /
                <span>Fat: {{ meal.fat }}</span>
              </li>
            </ul>
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
  MdIcon
} from "vue-material/dist/components";
import Meals from "./components/Meals.vue";
import Remaining from "./components/Remaining.vue";
import Target from "./components/Target.vue";

Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdDivider);
Vue.use(MdField);
Vue.use(MdIcon);

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
      handler() {
        Vue.ls.set("target", this.target);
      }
    },
    meals: {
      deep: true,
      handler() {
        Vue.ls.set("meals", this.meals);
      }
    },
    mealsHistory: {
      deep: true,
      handler() {
        Vue.ls.set("mealsHistory", this.mealsHistory);
      }
    }
  },
  computed: {
    targetCalories() {
      return this.calories(this.target);
    },
    eatenCarbs() {
      return this.meals.reduce((acc, meal) => acc + meal.carbs, 0);
    },
    eatenProtein() {
      return this.meals.reduce((acc, meal) => acc + meal.protein, 0);
    },
    eatenFat() {
      return this.meals.reduce((acc, meal) => acc + meal.fat, 0);
    },
    eatenCalories() {
      return this.meals.reduce((acc, meal) => acc + this.calories(meal), 0);
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
    remainingCalories() {
      return this.targetCalories - this.eatenCalories;
    },
    remaining() {
      return {
        carbs: this.remainingCarbs,
        protein: this.remainingProtein,
        fat: this.remainingFat
      };
    }
  },
  methods: {
    calories(meal) {
      return meal.carbs * 4 + meal.protein * 4 + meal.fat * 9;
    },
    add() {
      this.meals.push({
        carbs: null,
        protein: null,
        fat: null
      });
    },
    delAll() {
      this.mealsHistory.push(...this.meals.splice(0));
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
}
.ml-meals-history-button {
  margin-left: -7px; // Align
  .md-button-content > * {
    vertical-align: middle;
  }
}
</style>
