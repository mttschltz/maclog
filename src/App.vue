<template>
  <div id="app">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-size-50">
        <h1 class="md-display-3">MacLog</h1>
        <div v-for="(meal, index) in meals" :key="index">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-20">
              <MdField>
                <label :for="`name-${index}`">Meal</label>
                <MdInput
                  type="number"
                  :id="`name-${index}`"
                  v-model="meal.name"
                ></MdInput>
              </MdField>
            </div>
            <div class="md-layout-item md-size-20">
              <MdField>
                <label :for="`carbs-${index}`">Carbs</label>
                <MdInput
                  type="number"
                  :id="`carbs-${index}`"
                  v-model="meal.carbs"
                ></MdInput>
              </MdField>
            </div>
            <div class="md-layout-item md-size-20">
              <MdField>
                <label :for="`protein-${index}`">Protein</label>
                <MdInput
                  :id="`protein-${index}`"
                  v-model="meal.protein"
                ></MdInput>
              </MdField>
            </div>
            <div class="md-layout-item md-size-20">
              <MdField>
                <label :for="`fat-${index}`">Fat</label>
                <MdInput
                  type="number"
                  :id="`fat-${index}`"
                  v-model="meal.fat"
                ></MdInput>
              </MdField>
            </div>
            <div class="md-layout-item md-size-20">
              <MdField class="md-has-value ml-fake-field">
                <label>Calories</label>
                <p class="md-input ml-fake-input" v-text="calories(meal)" />
              </MdField>
            </div>
          </div>
        </div>
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
import { MdField } from "vue-material/dist/components";

Vue.use(MdField);

export default {
  name: "app",
  // components: { MdField, MdInput },
  data() {
    return {
      test: "test",
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
  methods: {
    calories(meal) {
      return meal.carbs * 4 + meal.protein * 4 + meal.fat * 9;
    }
  }
};
</script>

<style lang="scss">
.ml-fake-input {
  margin: 0;
}
.md-field.md-theme-default.ml-fake-field {
  background-color: rgba(0, 0, 0, 0.05);

  &:after {
    background-color: transparent;
  }
}
</style>
