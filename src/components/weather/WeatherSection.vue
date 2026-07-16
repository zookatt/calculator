<script setup>
import WeatherCard from './WeatherCard.vue'
</script>

<template>
  <section id="weather" class="weather-section">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <p class="section-label mb-1">Forecast</p>
        <h2 class="section-title mb-0">Weather</h2>
      </div>
    </div>

    <WeatherCard />
  </section>
</template>

<style scoped>
.weather-section {
  margin-top: 1.5rem;
}

.section-label {
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>