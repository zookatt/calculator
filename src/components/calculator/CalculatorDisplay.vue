<script setup>
defineProps({
  display: {
    type: String,
    required: true,
  },
  operation: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="display">
    <p class="operation">
      {{ operation || " " }}
    </p>

    <output
      class="result"
      data-testid="calculator-display"
      aria-live="polite"
    >
      {{ display }}
    </output>

    <p v-if="error" class="error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.display {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  text-align: end;
}

.operation {
  min-height: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-muted);
}

.result {
  display: block;
  margin: 0;
  font-size: clamp(3rem, 10vw, 4rem);
  font-weight: 300;
}

.error {
  margin: 0.5rem 0 0;
  color: var(--color-error);
  font-size: 0.875rem;
}
</style>
