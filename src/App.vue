<template>
  <div id="app">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-size-50">
        <div class="ml-fake-card">
          <h1 class="md-display-3 ml-h1">MacLog</h1>
          <p class="md-subheading">Log and count your macronutrients</p>
        </div>
        <!-- Target -->
        <div class="ml-fake-card">
          <div class="md-layout md-gutter ml-field-container">
            <div class="md-layout-item md-size-40">
              <h2 class="md-title">Daily Target</h2>
            </div>
            <div class="md-layout-item md-size-15">
              <MdField>
                <label :for="`carbs-target`">Carbs</label>
                <MdInput
                  type="number"
                  :id="`carbs-target`"
                  v-model="target.carbs"
                ></MdInput>
              </MdField>
            </div>
            <div class="md-layout-item md-size-15">
              <MdField>
                <label :for="`protein-target`">Protein</label>
                <MdInput
                  type="number"
                  :id="`protein-target`"
                  v-model="target.protein"
                ></MdInput>
              </MdField>
            </div>
            <div class="md-layout-item md-size-15">
              <MdField>
                <label :for="`fat-target`">Fat</label>
                <MdInput
                  type="number"
                  :id="`fat-target`"
                  v-model="target.fat"
                ></MdInput>
              </MdField>
            </div>
            <div class="md-layout-item md-size-15">
              <MdField class="md-has-value ml-fake-field">
                <label>Calories</label>
                <p class="md-input ml-fake-input" v-text="calories(target)" />
              </MdField>
            </div>
          </div>
        </div>
        <!-- Meals -->
        <div class="ml-fake-card">
          <h2 class="md-title">Meals</h2>
          <div v-for="(meal, index) in meals" :key="index">
            <div class="md-layout md-gutter ml-field-container">
              <div class="md-layout-item md-size-40">
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
            </div>
          </div>
          <div class="ml-align-right">
            <MdButton @click="add" class="md-fab md-mini md-primary">
              <MdIcon>add</MdIcon>
            </MdButton>
          </div>
        </div>
        <!-- Remaining -->
        <MdCard>
          <MdCardContent>
            <div class="md-layout md-gutter ml-field-container">
              <div class="md-layout-item md-size-40">
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
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
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

Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdDivider);
Vue.use(MdField);
Vue.use(MdIcon);

export default {
  name: "app",
  // components: { MdField, MdInput },
  data() {
    return {
      test: "test",
      target: {
        carbs: 50,
        protein: 50,
        fat: 50
      },
      meals: [
        {
          name: "Meal 1",
          carbs: 1,
          protein: 2,
          fat: 3
        },
        {
          name: "Meal 2",
          carbs: 4,
          protein: 5,
          fat: 6
        }
      ]
    };
  },
  computed: {
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
</style>
