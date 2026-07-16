<template>
  <article class="weather-card">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <div>
        <p class="location mb-1">Asturias</p>
        <h3 class="description mb-0">Clear sky</h3>
      </div>

      <span class="weather-icon" aria-hidden="true">
        ☀️
      </span>
    </div>

    <div class="d-flex justify-content-between align-items-end">
      <p class="temperature mb-0">
        22°C
      </p>

      <div class="text-end">
        <p class="range mb-1">Min. 18°C</p>
        <p class="range mb-0">Max. 26°C</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.weather-card {
  padding: 1.5rem;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(
      circle at top right,
      rgb(255 149 0 / 16%),
      transparent 10rem
    ),
    var(--color-surface);
}

.location {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.description {
  font-size: 1.1rem;
  font-weight: 500;
}

.weather-icon {
  font-size: 3rem;
}

.temperature {
  font-size: clamp(2.75rem, 12vw, 4rem);
  font-weight: 300;
  line-height: 1;
}

.range {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}
</style>