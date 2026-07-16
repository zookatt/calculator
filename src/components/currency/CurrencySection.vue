<script setup>
import { computed, onMounted, ref } from "vue";

import CurrencyForm from "./CurrencyForm.vue";
import CurrencyOutput from "./CurrencyOutput.vue";
import { convertCurrency } from "../../core/calculate/currencyConverter";
import { getCurrencyRates } from "../../core/apis/currency-freaks/currencyService";

const amount = ref("100");
const fromCurrency = ref("EUR");
const toCurrency = ref("USD");
const rates = ref(null);
const loading = ref(true);
const apiError = ref("");

const amountError = computed(() => {
  const numericAmount = Number(amount.value);

  if (
    amount.value === "" ||
    !Number.isFinite(numericAmount) ||
    numericAmount < 0
  ) {
    return "Enter a valid amount";
  }

  return "";
});

const convertedAmount = computed(() => {
  if (!rates.value || amountError.value) {
    return null;
  }

  return convertCurrency(
    amount.value,
    fromCurrency.value,
    toCurrency.value,
    rates.value,
  );
});

const exchangeRate = computed(() => {
  if (!rates.value) {
    return null;
  }

  return convertCurrency(1, fromCurrency.value, toCurrency.value, rates.value);
});

function swapCurrencies() {
  const previousFromCurrency = fromCurrency.value;

  fromCurrency.value = toCurrency.value;
  toCurrency.value = previousFromCurrency;
}

async function loadRates() {
  loading.value = true;
  apiError.value = "";

  try {
    rates.value = await getCurrencyRates();
  } catch {
    apiError.value = "Unable to load currency rates";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadRates();
});
</script>

<template>
  <section id="currency" class="currency">
    <h2 class="title">Currency Converter</h2>

    <CurrencyForm
      v-model:amount="amount"
      v-model:from-currency="fromCurrency"
      v-model:to-currency="toCurrency"
      :disabled="loading"
      @swap="swapCurrencies"
    />

    <p v-if="loading" role="status" class="message">
      Loading exchange rates...
    </p>

    <p v-else-if="apiError" role="alert" class="error">
      {{ apiError }}
    </p>

    <p v-else-if="amountError" role="alert" class="error">
      {{ amountError }}
    </p>

    <CurrencyOutput
      v-else-if="convertedAmount !== null && exchangeRate !== null"
      :converted-amount="convertedAmount"
      :rate="exchangeRate"
      :from-currency="fromCurrency"
      :to-currency="toCurrency"
    />
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

.message {
  margin: 1rem 0 0;
  color: var(--color-text-muted);
  text-align: center;
}

.error {
  margin: 1rem 0 0;
  color: var(--color-error);
  text-align: center;
}
</style>
