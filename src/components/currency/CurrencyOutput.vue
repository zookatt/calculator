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
  <div class="result" aria-live="polite">
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
  margin-top: 0.75rem;
  padding: 0.6rem;
  border-radius: var(--radius-sm);
  background: var(--color-background);
  text-align: center;
}

small,
p {
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

h3 {
  margin: 0.25rem 0;
  font-size: clamp(0.9rem, 3.5vw, 1.25rem);
  overflow-wrap: anywhere;
}
</style>
