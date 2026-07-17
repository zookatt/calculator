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
  padding: 0;
  border: none;
  background: transparent;
}

.weather-header,
.temperature-range {
  display: flex;
}

.weather-header {
  align-items: center;
  justify-content: space-between;
}

.temperature-range {
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.location,
.range {
  color: var(--color-text-muted);
}

.location {
  font-size: 0.75rem;
  overflow-wrap: anywhere;
}

.weather-icon {
  width: clamp(2.5rem, 12vw, 4rem);
  height: clamp(2.5rem, 12vw, 4rem);
  flex-shrink: 0;
  object-fit: contain;
}

.range {
  font-size: 0.75rem;
}

@media (min-width: 30rem) {
  .temperature-range {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
