<template>
  <div>
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
              v-model.number="meal.carbs"
            ></MdInput>
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField>
            <label :for="`protein-${index}`">Protein</label>
            <MdInput
              type="number"
              :id="`protein-${index}`"
              v-model.number="meal.protein"
            ></MdInput>
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField>
            <label :for="`fat-${index}`">Fat</label>
            <MdInput
              type="number"
              :id="`fat-${index}`"
              v-model.number="meal.fat"
            ></MdInput>
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Calories</label>
            <p class="md-input ml-fake-input" v-text="$calories(meal)" />
          </MdField>
        </div>
        <div class="md-layout-item md-size-10">
          <MdButton @click="del(index)" class="md-icon-button">
            <MdIcon>delete</MdIcon>
          </MdButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Meals",
  props: {
    meals: {
      type: Array,
      required: true
    },
    mealsHistory: {
      type: Array,
      required: true
    }
  },
  methods: {
    del(index) {
      this.mealsHistory.push(...this.meals.splice(index, 1));
    }
  }
};
</script>
