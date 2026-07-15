<template>
  <form>
    <div class="mb-3">
      <label for="amount" class="form-label"> Amount </label>

      <input id="amount" class="form-control" type="number" placeholder="100" />
    </div>

    <div class="row g-3">
      <div class="col-5">
        <label for="from" class="form-label"> From </label>

        <select id="from" class="form-select">
          <option>EUR</option>
          <option>USD</option>
          <option>JPY</option>
        </select>
      </div>

      <div class="col-2 d-flex align-items-end justify-content-center">
        <button class="btn btn-warning w-100" type="button">⇄</button>
      </div>

      <div class="col-5">
        <label for="to" class="form-label"> To </label>

        <select id="to" class="form-select">
          <option>USD</option>
          <option>EUR</option>
          <option>JPY</option>
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
