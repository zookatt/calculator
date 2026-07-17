<script setup>
import { onMounted, ref } from "vue";

import WeatherCard from "./WeatherCard.vue";
import { getAsturiasWeather } from "../../core/apis/el-tiempo/weatherService";

const weather = ref(null);
const loading = ref(true);
const error = ref("");

async function loadWeather() {
  loading.value = true;
  error.value = "";

  try {
    weather.value = await getAsturiasWeather();
  } catch {
    error.value = "Unable to load Asturias weather";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadWeather();
});
</script>

<template>
  <section id="weather" class="weather-section">
    <div class="mb-3">
      <p class="section-label mb-1">Forecast</p>
      <h2 class="section-title mb-0">Weather</h2>
    </div>

    <p v-if="loading" role="status" class="message">Loading weather...</p>

    <p v-else-if="error" role="alert" class="error">
      {{ error }}
    </p>

    <WeatherCard
      v-else-if="weather"
      :location="weather.location"
      :city="weather.city"
      :description="weather.description"
      :min-temperature="weather.minTemperature"
      :max-temperature="weather.maxTemperature"
      :image="weather.image"
    />
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

.message {
  color: var(--color-text-muted);
}

.error {
  color: var(--color-error);
}
</style>
