<template>
  <header class="container py-3">
    <div class="d-flex justify-content-between align-items-center">
      <button class="header-button">☰</button>

      <div class="brand">
        <h1>Calculator</h1>
      </div>

      <button class="header-button">⚙</button>
    </div>
  </header>
</template>

<style scoped>
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);

  display: grid;
  place-items: center;
}

.header-button {
  border: none;
  background: transparent;
  color: white;
}
</style>
