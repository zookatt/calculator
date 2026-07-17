<script setup>
defineProps({
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  minTemperature: {
    type: Number,
    required: true,
  },
  maxTemperature: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <article class="weather-card">
    <div class="weather-header">
      <div>
        <p class="location mb-1">{{ city }}, {{ location }}</p>
      </div>

      <img class="weather-icon" :src="image" :alt="`Weather in ${city}`" />
    </div>

    <div class="temperature-range">
      <p class="range mb-0">Min. {{ minTemperature }}°C</p>

      <p class="range mb-0">Max. {{ maxTemperature }}°C</p>
    </div>
  </article>
</template>

<style scoped>
.weather-card {
  padding: 1.5rem;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.weather-header,
.temperature-range {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.weather-header {
  align-items: flex-start;
}

.temperature-range {
  margin-top: 1.5rem;
}

.location,
.range {
  color: var(--color-text-muted);
}

.location {
  font-size: 0.875rem;
}

.weather-icon {
  width: 4rem;
  height: 4rem;
  object-fit: contain;
}

.range {
  font-size: 1rem;
}
</style>
