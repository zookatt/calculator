<script setup>
import { CURRENCIES } from "../../core/models/currencies";

defineProps({
  amount: {
    type: String,
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
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits([
  "update:amount",
  "update:fromCurrency",
  "update:toCurrency",
  "swap",
]);
</script>

<template>
  <form class="currency-form" @submit.prevent>
    <div class="form-field">
      <label for="amount" class="form-label"> Amount </label>

      <input
        id="amount"
        class="form-control"
        type="number"
        min="0"
        step="any"
        :value="amount"
        :disabled="disabled"
        data-testid="currency-amount"
        @input="$emit('update:amount', $event.target.value)"
      />
    </div>

    <div class="currency-fields">
      <div class="form-field">
        <label for="from" class="form-label"> From </label>

        <select
          id="from"
          class="form-select"
          :value="fromCurrency"
          :disabled="disabled"
          data-testid="from-currency"
          @change="$emit('update:fromCurrency', $event.target.value)"
        >
          <option
            v-for="currency in CURRENCIES"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
      </div>

      <button
        class="swap-button"
        type="button"
        aria-label="Swap currencies"
        :disabled="disabled"
        data-testid="swap-currencies"
        @click="$emit('swap')"
      >
        ⇄
      </button>

      <div class="form-field">
        <label for="to" class="form-label"> To </label>

        <select
          id="to"
          class="form-select"
          :value="toCurrency"
          :disabled="disabled"
          data-testid="to-currency"
          @change="$emit('update:toCurrency', $event.target.value)"
        >
          <option
            v-for="currency in CURRENCIES"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<style scoped>
.currency-form {
  display: grid;
  gap: 0.75rem;
}

.form-field {
  min-width: 0;
}

.form-label {
  margin-bottom: 0.25rem;
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.form-control,
.form-select {
  min-width: 0;
  padding: 0.45rem;
  border-color: transparent;
  background: var(--color-button);
  color: var(--color-text);
  font-size: 0.8rem;
}

.currency-fields {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2rem minmax(0, 1fr);
  gap: 0.25rem;
  align-items: end;
}

.swap-button {
  width: 2rem;
  height: 2.25rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-background);
  font-weight: 700;
}

.swap-button:disabled {
  opacity: 0.5;
}
</style>
