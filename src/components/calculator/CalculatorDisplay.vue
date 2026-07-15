<template>
  <div class="display">
    <p class="operation">12 × 3</p>

    <h2 class="result">36</h2>
  </div>
</template>

<style scoped>
.display {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  text-align: end;
}

.operation {
  margin-bottom: .5rem;
  color: var(--color-text-muted);
}

.result {
  margin: 0;
  font-size: clamp(3rem, 10vw, 4rem);
  font-weight: 300;
}
</style>