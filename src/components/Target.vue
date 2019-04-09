<template>
  <div class="ml-fake-card">
    <div class="md-layout md-gutter ml-field-container">
      <div class="md-layout-item md-size-30">
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
        <div class="ml-as-percentage">{{ carbsAsPercent }}%</div>
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
        <div class="ml-as-percentage">{{ proteinAsPercent }}%</div>
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
        <div class="ml-as-percentage">{{ fatAsPercent }}%</div>
      </div>
      <div class="md-layout-item md-size-15">
        <MdField class="md-has-value ml-fake-field">
          <label>Calories</label>
          <p class="md-input ml-fake-input" v-text="calories" />
        </MdField>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Target",
  props: {
    target: {
      type: Object,
      required: true
    },
    calories: {
      type: Number,
      required: true
    }
  },
  computed: {
    carbsAsPercent() {
      const carbsAsRatio = (this.target.carbs * 4) / this.calories;
      return (carbsAsRatio * 100).toFixed(1);
    },
    proteinAsPercent() {
      const proteinAsRatio = (this.target.protein * 4) / this.calories;
      return (proteinAsRatio * 100).toFixed(1);
    },
    fatAsPercent() {
      const fatAsRatio = (this.target.fat * 9) / this.calories;
      return (fatAsRatio * 100).toFixed(1);
    }
  }
};
</script>
<style lang="scss">
.ml-as-percentage {
  color: #bbb;
}
</style>
