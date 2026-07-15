<template>
  <section class="calculator">
    <div class="display">
      <p class="operation">0</p>
      <h2 class="result">0</h2>
    </div>

    <div class="keypad">Calculator keypad</div>
  </section>
</template>

<style scoped>
.calculator {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.display {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: end;
}

.operation {
  min-height: 24px;
  margin-bottom: 0.5rem;
  color: var(--color-text-muted);
  font-size: 1rem;
}

.result {
  margin: 0;
  font-size: clamp(3rem, 10vw, 4rem);
  font-weight: 300;
}

.keypad {
  display: grid;
  min-height: 320px;
  margin-top: 1.5rem;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  place-items: center;
}
</style>
