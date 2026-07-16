<script setup>
import CalculatorDisplay from "./CalculatorDisplay.vue";
import CalculatorKeypad from "./CalculatorKeypad.vue";
import { useCalculator } from "../../core/useCalculator";
import { useCalculatorMemoryStore } from "../../stores/calculatorMemory";
const {
  display,
  operation,
  error,
  inputDigit,
  inputDecimal,
  selectOperator,
  equals,
  setDisplay,
  clear,
} = useCalculator();

const memoryStore = useCalculatorMemoryStore();

function handlePress(button) {
  if (button === "M+") {
    const currentNumber = Number(display.value);

    memoryStore.save(currentNumber);
    return;
  }

  if (button === "MR") {
    const storedNumber = memoryStore.recall();

    if (storedNumber !== null) {
      setDisplay(storedNumber);
    }

    return;
  }

  if (button === "MC") {
    memoryStore.clear();
    return;
  }
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
