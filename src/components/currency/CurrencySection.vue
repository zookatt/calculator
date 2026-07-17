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
const isExpanded = ref(false);

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
    <button
      class="currency-toggle"
      type="button"
      aria-controls="currency-content"
      :aria-expanded="isExpanded"
      data-testid="currency-toggle"
      @click="isExpanded = !isExpanded"
    >
      <span class="title">Currency Converter</span>
      <span class="toggle-icon" aria-hidden="true">
        {{ isExpanded ? "−" : "+" }}
      </span>
    </button>

    <div id="currency-content" v-show="isExpanded" class="currency-content">
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
    </div>
  </section>
</template>

<style scoped>
.currency {
  height: 100%;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.currency-toggle {
  display: flex;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-text);
  text-align: start;
  align-items: center;
  justify-content: space-between;
}

.title {
  margin: 0;
  font-size: clamp(1rem, 4vw, 1.25rem);
  font-weight: 600;
}

.toggle-icon {
  display: grid;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  background: var(--color-button);
  color: var(--color-primary);
  font-size: 1.25rem;
  place-items: center;
}

.currency-content {
  margin-top: 0.75rem;
}

.message,
.error {
  margin: 0.75rem 0 0;
  font-size: 0.875rem;
  text-align: center;
}

.message {
  color: var(--color-text-muted);
}

.error {
  color: var(--color-error);
}

@media (min-width: 48rem) {
  .currency {
    padding: 1.25rem;
    border-radius: var(--radius-lg);
  }
}
</style>
