<script setup>
import { CURRENCIES } from "../../tests/core/models/currencies";

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
  <form @submit.prevent>
    <div class="mb-3">
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

    <div class="row g-3">
      <div class="col-5">
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

      <div class="col-2 d-flex align-items-end justify-content-center">
        <button
          class="btn btn-warning w-100"
          type="button"
          aria-label="Swap currencies"
          :disabled="disabled"
          data-testid="swap-currencies"
          @click="$emit('swap')"
        >
          ⇄
        </button>
      </div>

      <div class="col-5">
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
.form-label {
  color: var(--color-text-muted);
}

.form-control,
.form-select {
  background: var(--color-button);
  color: var(--color-text);
}
</style>
