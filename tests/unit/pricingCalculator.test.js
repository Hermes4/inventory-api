const {
  calculateFinalPrice,
} = require("../../src/modules/orders/pricing/pricingCalculator");

describe("Pricing Calculator", () => {
  test("applies 10% discount for 5 items", () => {
    const result = calculateFinalPrice({
      items: [{ price: 10, quantity: 5, category: "electronics" }],
      customer: { location: "US" },
    });

    expect(result.bestDiscount).toBe(0.1);
    expect(result.finalPrice).toBe(45);
  });

  test("applies 20% discount for 10 items", () => {
    const result = calculateFinalPrice({
      items: [{ price: 10, quantity: 10, category: "electronics" }],
      customer: { location: "US" },
    });

    expect(result.bestDiscount).toBe(0.2);
    expect(result.finalPrice).toBe(80);
  });

  test("applies location pricing for EU (+15%)", () => {
    const result = calculateFinalPrice({
      items: [{ price: 100, quantity: 1, category: "electronics" }],
      customer: { location: "EU" },
    });

    expect(result.priceWithLocation).toBe(115);
  });

  test("applies highest discount only (volume vs seasonal)", () => {
    const novemberDate = new Date("2025-11-28");

    const result = calculateFinalPrice({
      items: [{ price: 10, quantity: 10, category: "electronics" }],
      customer: { location: "US" },
      date: novemberDate,
    });

    expect(result.bestDiscount).toBe(0.25);
  });
});
