<script setup>
const props = defineProps({
  convertedAmount: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  fromCurrency: {
    type: String,
    required: true,
  },
  toCurrency: {
    type: String,
    required: true,
  },
});

function formatAmount(amount) {
  return amount.toFixed(2);
}

function formatRate(rate) {
  return rate.toFixed(4);
}
</script>

<template>
  <div class="result mt-4" aria-live="polite">
    <small>Converted amount</small>

    <h3 data-testid="converted-amount">
      {{ formatAmount(props.convertedAmount) }}
      {{ props.toCurrency }}
    </h3>

    <p class="mb-0">
      1 {{ props.fromCurrency }} =
      {{ formatRate(props.rate) }}
      {{ props.toCurrency }}
    </p>
  </div>
</template>

<style scoped>
.result {
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--color-background);
  text-align: center;
}

small,
p {
  color: var(--color-text-muted);
}

h3 {
  margin: 0.5rem 0;
}
</style>