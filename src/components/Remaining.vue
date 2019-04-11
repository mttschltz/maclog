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
            <p
              class="md-input ml-fake-input"
              v-text="$roundOne(remaining.carbs)"
            />
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Protein</label>
            <p
              class="md-input ml-fake-input"
              v-text="$roundOne(remaining.protein)"
            />
          </MdField>
        </div>
        <div class="md-layout-item md-size-15">
          <MdField class="md-has-value ml-fake-field">
            <label>Fat</label>
            <p
              class="md-input ml-fake-input"
              v-text="$roundOne(remaining.fat)"
            />
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
    meals: {
      type: Array,
      required: true
    },
    remaining: {
      type: Object,
      required: true
    },
    target: {
      type: Object,
      required: true
    }
  },
  computed: {
    targetCalories() {
      return this.$calories(this.target);
    },
    eatenCalories() {
      return this.meals.reduce((acc, meal) => acc + this.$calories(meal), 0);
    },
    remainingCalories() {
      return this.targetCalories - this.eatenCalories;
    },
    caloriesAsPercent() {
      if (!this.targetCalories) {
        return 0;
      }
      const caloriesAsRatio =
        (this.targetCalories - this.remainingCalories) / this.targetCalories;
      return this.$toPercent(caloriesAsRatio);
    },
    carbsEatenAsPercent() {
      if (!this.target.carbs) {
        return 0;
      }
      const carbsAsRatio =
        ((this.target.carbs - this.remaining.carbs) * 4) / this.targetCalories;
      return this.$toPercent(carbsAsRatio);
    },
    proteinEatenAsPercent() {
      if (!this.target.protein) {
        return 0;
      }
      const proteinAsRatio =
        ((this.target.protein - this.remaining.protein) * 4) /
        this.targetCalories;
      return this.$toPercent(proteinAsRatio);
    },
    fatEatenAsPercent() {
      if (!this.target.fat) {
        return 0;
      }
      const fatAsRatio =
        ((this.target.fat - this.remaining.fat) * 9) / this.targetCalories;
      return this.$toPercent(fatAsRatio);
    },
    carbsTargetAsPercent() {
      if (!this.target.carbs) {
        return 0;
      }
      const carbsAsRatio = (this.target.carbs * 4) / this.targetCalories;
      return this.$toPercent(carbsAsRatio);
    },
    proteinTargetAsPercent() {
      if (!this.target.protein) {
        return 0;
      }
      const proteinAsRatio = (this.target.protein * 4) / this.targetCalories;
      return this.$toPercent(proteinAsRatio);
    },
    fatTargetAsPercent() {
      if (!this.target.fat) {
        return 0;
      }
      const fatAsRatio = (this.target.fat * 9) / this.targetCalories;
      return this.$toPercent(fatAsRatio);
    },
    carbsBarStyle() {
      const percentage = this.$toPercent(
        this.carbsEatenAsPercent / this.carbsTargetAsPercent
      );
      return {
        width: Math.min(percentage, 100) + "%",
        backgroundColor: this.barColor(percentage)
      };
    },
    proteinBarStyle() {
      const percentage = this.$toPercent(
        this.proteinEatenAsPercent / this.proteinTargetAsPercent
      );
      return {
        width: Math.min(percentage, 100) + "%",
        backgroundColor: this.barColor(percentage)
      };
    },
    fatBarStyle() {
      const percentage = this.$toPercent(
        this.fatEatenAsPercent / this.fatTargetAsPercent
      );
      return {
        width: Math.min(percentage, 100) + "%",
        backgroundColor: this.barColor(percentage)
      };
    },
    caloriesBarStyle() {
      return {
        width: Math.min(this.caloriesAsPercent, 100) + "%",
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
