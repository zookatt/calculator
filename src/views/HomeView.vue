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
      <div class="dashboard-panel weather-panel" data-testid="weather-panel">
        <WeatherSection />
      </div>

      <div class="dashboard-panel currency-panel" data-testid="currency-panel">
        <CurrencySection />
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dashboard-panel {
  display: flex;
  min-width: 0;
}

.dashboard-panel > * {
  flex: 1;
}

.calculator-panel {
  width: min(100%, 32rem);
  margin-inline: auto;
}

@media (min-width: 48rem) {
  .app-shell {
    width: min(calc(100% - 2rem), 70rem);
    padding-block: 1rem 2rem;
  }

  .dashboard {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    align-items: stretch;
  }

  .weather-panel {
    grid-column: 1;
  }

  .currency-panel {
    grid-column: 2;
  }

  .calculator-panel {
    grid-column: 1 / -1;
  }
}
</style>
