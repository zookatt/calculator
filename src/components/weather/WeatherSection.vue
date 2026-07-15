<template>
  <section class="weather">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="title">Weather</h2>
        <p class="location mb-0">Asturias</p>
      </div>

      <span class="icon" aria-hidden="true">☀️</span>
    </div>

    <div class="row text-center">
      <div class="col-4">
        <p class="label">Temp.</p>
        <p class="value">22°C</p>
      </div>

      <div class="col-4">
        <p class="label">Min.</p>
        <p class="value">18°C</p>
      </div>

      <div class="col-4">
        <p class="label">Max.</p>
        <p class="value">26°C</p>
      </div>
    </div>

    <p class="description mt-4 mb-0">Clear sky</p>
  </section>
</template>

<style scoped>
.weather {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.location {
  color: var(--color-text-muted);
}

.icon {
  font-size: 3rem;
}

.label {
  margin-bottom: 0.25rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.value {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.description {
  color: var(--color-text);
  font-size: 1rem;
  text-align: center;
}
</style>
