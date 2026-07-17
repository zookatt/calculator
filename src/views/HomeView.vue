<script setup>
import Header from "../components/layout/Header.vue";
import CalculatorSection from "../components/calculator/CalculatorSection.vue";
import CurrencySection from "../components/currency/CurrencySection.vue";
import WeatherSection from "../components/weather/WeatherSection.vue";
</script>

<template>
  <main class="app-shell">
    <Header />

    <div class="dashboard">
      <div class="dashboard-panel currency-panel" data-testid="currency-panel">
        <CurrencySection />
      </div>

      <div class="dashboard-panel weather-panel" data-testid="weather-panel">
        <WeatherSection />
      </div>

      <div
        class="dashboard-panel calculator-panel"
        data-testid="calculator-panel"
      >
        <CalculatorSection />
      </div>
    </div>
  </main>
</template>

<style scoped>
.app-shell {
  width: min(calc(100% - 1rem), 70rem);
  margin-inline: auto;
  padding-block: 0.5rem 1.5rem;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  align-items: start;
}

.dashboard-panel {
  min-width: 0;
}

.currency-panel {
  grid-column: 1;
}

.weather-panel {
  grid-column: 2;
}

.calculator-panel {
  grid-column: 1 / -1;
  width: min(100%, 32rem);
  margin-inline: auto;
}

@media (min-width: 48rem) {
  .app-shell {
    width: min(calc(100% - 2rem), 70rem);
    padding-block: 1rem 2rem;
  }

  .dashboard {
    gap: 1rem;
  }
}
</style>
