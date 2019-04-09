<template>
  <MdCard>
    <MdCardContent>
      <div class="md-layout md-gutter ml-field-container">
        <div class="md-layout-item md-size-30">
          <h2 class="md-title">Remaining</h2>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Carbs</label>
            <p class="md-input ml-fake-input" v-text="remaining.carbs" />
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Protein</label>
            <p class="md-input ml-fake-input" v-text="remaining.protein" />
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Fat</label>
            <p class="md-input ml-fake-input" v-text="remaining.fat" />
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Calories</label>
            <p class="md-input ml-fake-input" v-text="remainingCalories" />
          </MdField>
        </div>
      </div>
    </MdCardContent>
  </MdCard>
</template>
<script>
export default {
  name: "Target",
  props: {
    target: {
      type: Object,
      required: true
    },
    targetCalories: {
      type: Number,
      required: true
    },
    remaining: {
      type: Object,
      required: true
    },
    remainingCalories: {
      type: Number,
      required: true
    }
  }
};
</script>
