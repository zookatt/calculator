<script setup>
import CurrencyForm from "./CurrencyForm.vue";
import CurrencyOutput from "./CurrencyOutput.vue";
</script>

<template>
  <section class="currency">
    <h2 class="title">Currency Converter</h2>

    <CurrencyForm />

    <CurrencyOutput />
  </section>
</template>

<style scoped>
.currency {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.title {
  margin-bottom: 1.5rem;
}
</style>
