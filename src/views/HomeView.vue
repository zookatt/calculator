<script setup>
import Header from "../components/layout/Header.vue";
import BottomNavigation from "../components/layout/BottomNavigation.vue";
import CalculatorSection from "../components/calculator/CalculatorSection.vue";
</script>

<template>
  <main class="container py-3">
    <Header />

    <section>
      <CalculatorSection />
    </section>

    <section>
      <!-- Currency converter -->
    </section>

    <section>
      <!-- Weather -->
    </section>

    <BottomNavigation />
  </main>
</template>

<style lang="scss" scoped></style>
