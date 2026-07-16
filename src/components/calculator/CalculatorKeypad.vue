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
  <div class="row g-2 mt-4">
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
.calc-button {
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 3rem;
  background: var(--color-button);
  color: var(--color-text);
}

.operator {
  background: var(--color-primary);
  color: var(--color-background);
}
</style>
