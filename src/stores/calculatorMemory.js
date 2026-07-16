import { defineStore } from "pinia";

export const useCalculatorMemoryStore = defineStore(
  "calculatorMemory",
  {
    state: () => ({
      storedNumber: null,
    }),

    actions: {
      save(number) {
        if (!Number.isFinite(number)) {
          return;
        }

        this.storedNumber = number;
      },

      recall() {
        return this.storedNumber;
      },

      clear() {
        this.storedNumber = null;
      },
    },
  },
);