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
          <div v-for="(meal, index) in meals" :key="index">
            <div class="md-layout md-gutter ml-field-container">
              <div class="md-layout-item md-size-30">
                <MdField>
                  <label :for="`name-${index}`">Meal</label>
                  <MdInput
                    type="text"
                    :id="`name-${index}`"
                    v-model="meal.name"
                  ></MdInput>
                </MdField>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField>
                  <label :for="`carbs-${index}`">Carbs</label>
                  <MdInput
                    type="number"
                    :id="`carbs-${index}`"
                    v-model="meal.carbs"
                  ></MdInput>
                </MdField>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField>
                  <label :for="`protein-${index}`">Protein</label>
                  <MdInput
                    type="number"
                    :id="`protein-${index}`"
                    v-model="meal.protein"
                  ></MdInput>
                </MdField>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField>
                  <label :for="`fat-${index}`">Fat</label>
                  <MdInput
                    type="number"
                    :id="`fat-${index}`"
                    v-model="meal.fat"
                  ></MdInput>
                </MdField>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField class="md-has-value ml-fake-field">
                  <label>Calories</label>
                  <p class="md-input ml-fake-input" v-text="calories(meal)" />
                </MdField>
              </div>
              <div class="md-layout-item md-size-10">
                <MdButton @click="del(index)" class="md-icon-button">
                  <MdIcon>delete</MdIcon>
                </MdButton>
              </div>
            </div>
          </div>
          <div class="ml-align-right">
            <MdButton @click="add" class="md-fab md-mini md-accent">
              <MdIcon>add</MdIcon>
            </MdButton>
          </div>
        </div>
        <!-- Remaining -->
        <MdCard>
          <MdCardContent>
            <div class="md-layout md-gutter ml-field-container">
              <div class="md-layout-item md-size-30">
                <h2 class="md-title">Remaining</h2>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField class="md-has-value ml-fake-field">
                  <label>Carbs</label>
                  <p class="md-input ml-fake-input" v-text="remainingCarbs" />
                </MdField>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField class="md-has-value ml-fake-field">
                  <label>Protein</label>
                  <p class="md-input ml-fake-input" v-text="remainingProtein" />
                </MdField>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField class="md-has-value ml-fake-field">
                  <label>Fat</label>
                  <p class="md-input ml-fake-input" v-text="remainingFat" />
                </MdField>
              </div>
              <div class="md-layout-item md-size-15">
                <MdField class="md-has-value ml-fake-field">
                  <label>Calories</label>
                  <p
                    class="md-input ml-fake-input"
                    v-text="remainingCalories"
                  />
                </MdField>
              </div>
            </div>
          </MdCardContent>
        </MdCard>
        <!-- Deleted meals -->
        <div class="ml-fake-card">
          <MdButton
            @click="showDeleted = !showDeleted"
            class="md-mini md-plain ml-deleted-meals-button"
          >
            <span>Recently Deleted Meals</span>
            <MdIcon v-if="!showDeleted">expand_more</MdIcon>
            <MdIcon v-if="showDeleted">expand_less</MdIcon>
          </MdButton>
          <div v-if="showDeleted">
            <p class="md-subheading">In case of accidental deletion</p>
            <ul>
              <li v-for="(meal, index) in deletedMeals" v-bind:key="index">
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
import Target from "./components/Target.vue";

Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdDivider);
Vue.use(MdField);
Vue.use(MdIcon);

export default {
  components: { Target },
  name: "MacLog",
  data() {
    return {
      showDeleted: false,
      target: {
        carbs: null,
        protein: null,
        fat: null
      },
      meals: [],
      deletedMeals: []
    };
  },
  mounted() {
    const target = Vue.ls.get("target");
    target instanceof Object && (this.target = target);

    const meals = Vue.ls.get("meals");
    meals instanceof Array && (this.meals = meals);
  },
  watch: {
    target: {
      deep: true,
      handler() {
        console.log("target changed");
        Vue.ls.set("target", this.target);
      }
    },
    meals: {
      deep: true,
      handler() {
        Vue.ls.set("meals", this.meals);
      }
    }
  },
  computed: {
    targetCalories() {
      return this.calories(this.target);
    },
    remainingCarbs() {
      return (
        this.target.carbs -
        this.meals.reduce((acc, meal) => acc + meal.carbs, 0)
      );
    },
    remainingProtein() {
      return (
        this.target.protein -
        this.meals.reduce((acc, meal) => acc + meal.protein, 0)
      );
    },
    remainingFat() {
      return (
        this.target.fat - this.meals.reduce((acc, meal) => acc + meal.fat, 0)
      );
    },
    remainingCalories() {
      return (
        this.calories(this.target) -
        this.meals.reduce((acc, meal) => acc + this.calories(meal), 0)
      );
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
    del(index) {
      this.deletedMeals.push(...this.meals.splice(index, 1));
    },
    delAll() {
      this.deletedMeals.push(...this.meals.splice(0));
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
.ml-field-container .md-input {
  max-width: 100%;
}
.ml-align-right {
  text-align: right;
}
.ml-deleted-meals-button {
  margin-left: -7px; // Align
  .md-button-content > * {
    vertical-align: middle;
  }
}
</style>
