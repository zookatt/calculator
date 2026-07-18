<script setup>
defineEmits(["press"]);

const buttons = [
  "MC",
  "MR",
  "M+",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "CE",
  "0",
  ".",
  "=",
];

const operators = ["+", "-", "×", "÷", "="];

const buttonLabels = {
  MC: "clear memory",
  MR: "recall memory",
  "M+": "save to memory",
  "÷": "divide",
  "×": "multiply",
  "-": "subtract",
  "+": "add",
  CE: "clear calculator",
  ".": "decimal point",
  "=": "equals",
};

function getButtonLabel(button) {
  return buttonLabels[button] || button;
}
</script>

<template>
  <div class="row g-2 keypad">
    <div v-for="button in buttons" :key="button" class="col-3">
      <button
        type="button"
        class="calc-button w-100"
        :class="{ operator: operators.includes(button) }"
        :aria-label="getButtonLabel(button)"
        :data-testid="`key-${button}`"
        @click="$emit('press', button)"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keypad {
  margin-top: 0.75rem;
}

.calc-button {
  width: 100%;
  min-height: 3rem;
  border: none;
  border-radius: var(--radius-full);
  background: var(--color-button);
  color: var(--color-text);
  font-size: 0.9rem;
  transition:
    background-color 150ms ease,
    transform 100ms ease;
}

.calc-button:active {
  transform: scale(0.96);
}

.operator {
  background: var(--color-primary);
  color: var(--color-background);
}

@media (min-width: 30rem) {
  .keypad {
    margin-top: 1rem;
  }

  .calc-button {
    min-height: 3.25rem;
    font-size: 1rem;
  }
}

@media (min-width: 64rem) {
  .calc-button {
    min-height: 3.5rem;
  }
}
</style>
