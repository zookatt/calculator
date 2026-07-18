<template>
  <header class="app-header">
    <h1>Calculator</h1>
  </header>
</template>

<style scoped>
.app-header {
  padding-block: 0.5rem 1rem;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: clamp(1.4rem, 6vw, 2rem);
}

@media (min-width: 48rem) {
  .app-header {
    padding-block: 0.25rem 0.75rem;
  }
}
</style>
