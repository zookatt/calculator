<template>
  <section class="currency">
    <h2 class="title">Currency Converter</h2>

    <div class="mb-3">
      <label for="amount" class="form-label">Amount</label>

      <input id="amount" class="form-control" type="number" placeholder="100" />
    </div>

    <div class="row g-3">
      <div class="col-6">
        <label for="from" class="form-label">From</label>

        <select id="from" class="form-select">
          <option>EUR</option>
          <option>USD</option>
          <option>JPY</option>
        </select>
      </div>

      <div class="col-6">
        <label for="to" class="form-label">To</label>

        <select id="to" class="form-select">
          <option>USD</option>
          <option>EUR</option>
          <option>JPY</option>
        </select>
      </div>
    </div>

    <div class="result mt-4">
      <span>100 EUR = 108.45 USD</span>
    </div>
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
  font-size: 1.25rem;
  font-weight: 600;
}

.form-label {
  color: var(--color-text-muted);
}

.form-control,
.form-select {
  border: none;
  background: var(--color-button);
  color: var(--color-text);
}

.form-control:focus,
.form-select:focus {
  border-color: transparent;
  background: var(--color-button);
  box-shadow: 0 0 0 0.2rem rgb(255 149 0 / 20%);
  color: var(--color-text);
}

.result {
  padding: 1rem;
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 5%);
  color: var(--color-text);
  font-weight: 500;
  text-align: center;
}
</style>
