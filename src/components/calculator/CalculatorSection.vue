<script setup>
import CalculatorDisplay from "./CalculatorDisplay.vue";
import CalculatorKeypad from "./CalculatorKeypad.vue";
import { useCalculator } from "../../core/useCalculator";
const {
  display,
  operation,
  error,
  inputDigit,
  inputDecimal,
  selectOperator,
  equals,
  clear,
} = useCalculator();

function handlePress(button) {
  const isDigit = /^\d$/.test(button);

  if (isDigit) {
    inputDigit(button);
    return;
  }

  if (button === ".") {
    inputDecimal();
    return;
  }

  const operators = ["+", "-", "×", "÷"];
  const isOperator = operators.includes(button);

  if (isOperator) {
    selectOperator(button);
    return;
  }

  if (button === "=") {
    equals();
    return;
  }

  if (button === "CE") {
    clear();
  }
}
</script>

<template>
  <section class="calculator">
    <CalculatorDisplay
      :display="display"
      :operation="operation"
      :error="error"
    />

    <CalculatorKeypad @press="handlePress" />
  </section>
</template>

<style scoped>
.calculator {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background-color: var(--color-background);
}
</style>
