// @vitest-environment node

import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useCalculatorMemoryStore } from "../../stores/calculatorMemory";

describe("calculator memory store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts with empty memory", () => {
    const memoryStore = useCalculatorMemoryStore();

    expect(memoryStore.storedNumber).toBeNull();
  });

  it("saves a number in memory", () => {
    const memoryStore = useCalculatorMemoryStore();

    memoryStore.save(42);

    expect(memoryStore.storedNumber).toBe(42);
  });

  it("recalls the saved number", () => {
    const memoryStore = useCalculatorMemoryStore();

    memoryStore.save(25);

    expect(memoryStore.recall()).toBe(25);
  });

  it("clears the saved number", () => {
    const memoryStore = useCalculatorMemoryStore();

    memoryStore.save(25);
    memoryStore.clear();

    expect(memoryStore.storedNumber).toBeNull();
  });

  it("does not save an invalid number", () => {
    const memoryStore = useCalculatorMemoryStore();

    memoryStore.save(Number.NaN);

    expect(memoryStore.storedNumber).toBeNull();
  });
});