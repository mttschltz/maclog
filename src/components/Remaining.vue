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
    <MdCardContent>
      <div class="md-layout md-gutter ml-field-container">
        <div class="md-layout-item md-size-30">
          <h2 class="md-title">Progress</h2>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Carbs</label>
            <div class="ml-remaining-as-percentage">
              {{ carbsEatenAsPercent }}% of {{ carbsTargetAsPercent }}%
            </div>
          </MdField>
          <div class="ml-remaining-bar">
            <div class="ml-remaining-bar-inner" :style="carbsBarStyle"></div>
          </div>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Protein</label>
            <div class="ml-remaining-as-percentage">
              {{ proteinEatenAsPercent }}% of {{ proteinTargetAsPercent }}%
            </div>
          </MdField>
          <div class="ml-remaining-bar">
            <div class="ml-remaining-bar-inner" :style="proteinBarStyle"></div>
          </div>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Fat</label>
            <div class="ml-remaining-as-percentage">
              {{ fatEatenAsPercent }}% of {{ fatTargetAsPercent }}%
            </div>
          </MdField>
          <div class="ml-remaining-bar">
            <div class="ml-remaining-bar-inner" :style="fatBarStyle"></div>
          </div>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Calories</label>
            <div class="ml-remaining-as-percentage">
              {{ caloriesAsPercent }}%
            </div>
          </MdField>
          <div class="ml-remaining-bar">
            <div class="ml-remaining-bar-inner" :style="caloriesBarStyle"></div>
          </div>
        </div>
      </div>
    </MdCardContent>
  </MdCard>
</template>
<script>
export default {
  name: "Remaining",
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
  },
  computed: {
    caloriesAsPercent() {
      const caloriesAsRatio =
        (this.targetCalories - this.remainingCalories) / this.targetCalories;
      return (caloriesAsRatio * 100).toFixed(1);
    },
    carbsEatenAsPercent() {
      const carbsAsRatio =
        ((this.target.carbs - this.remaining.carbs) * 4) / this.targetCalories;
      return (carbsAsRatio * 100).toFixed(1);
    },
    proteinEatenAsPercent() {
      const proteinAsRatio =
        ((this.target.protein - this.remaining.protein) * 4) /
        this.targetCalories;
      return (proteinAsRatio * 100).toFixed(1);
    },
    fatEatenAsPercent() {
      const fatAsRatio =
        ((this.target.fat - this.remaining.fat) * 9) / this.targetCalories;
      return (fatAsRatio * 100).toFixed(1);
    },
    carbsTargetAsPercent() {
      const carbsAsRatio = (this.target.carbs * 4) / this.targetCalories;
      return (carbsAsRatio * 100).toFixed(1);
    },
    proteinTargetAsPercent() {
      const proteinAsRatio = (this.target.protein * 4) / this.targetCalories;
      return (proteinAsRatio * 100).toFixed(1);
    },
    fatTargetAsPercent() {
      const fatAsRatio = (this.target.fat * 9) / this.targetCalories;
      return (fatAsRatio * 100).toFixed(1);
    },
    carbsBarStyle() {
      const percentage =
        (100 * this.carbsEatenAsPercent) / this.carbsTargetAsPercent;
      return {
        width: percentage + "%",
        backgroundColor: this.barColor(percentage)
      };
    },
    proteinBarStyle() {
      const percentage =
        (100 * this.proteinEatenAsPercent) / this.proteinTargetAsPercent;
      return {
        width: percentage + "%",
        backgroundColor: this.barColor(percentage)
      };
    },
    fatBarStyle() {
      const percentage =
        (100 * this.fatEatenAsPercent) / this.fatTargetAsPercent;
      return {
        width: percentage + "%",
        backgroundColor: this.barColor(percentage)
      };
    },
    caloriesBarStyle() {
      return {
        width: this.caloriesAsPercent + "%",
        backgroundColor: this.barColor(this.caloriesAsPercent)
      };
    }
  },
  methods: {
    barColor(percentage) {
      if (percentage < 50) {
        return "#64dd17";
      }
      if (percentage < 75) {
        return "#ff6d00";
      }
      return "#d50000";
    }
  }
};
</script>
<style lang="scss">
.ml-remaining-bar {
  position: relative;
  height: 5px;
  background-color: #bbb;
}
.ml-remaining-as-percentage {
  margin-top: 5px;
}
.ml-remaining-bar-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  // width set dynamically
}
</style>
