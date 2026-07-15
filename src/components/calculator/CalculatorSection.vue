<script setup>
import CalculatorDisplay from "./CalculatorDisplay.vue";
import CalculatorKeypad from "./CalculatorKeypad.vue";
</script>

<template>
  <section class="calculator">
    <CalculatorDisplay />

    <CalculatorKeypad />
  </section>
</template>

<style scoped>
.calculator {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background-color: var(--color-background);
}
</style>
