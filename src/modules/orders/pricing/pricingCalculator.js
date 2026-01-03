function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function getVolumeDiscount(totalQuantity) {
  if (totalQuantity >= 50) return 0.3;
  if (totalQuantity >= 10) return 0.2;
  if (totalQuantity >= 5) return 0.1;
  return 0;
}

function getSeasonalDiscount(date, categories) {
  const month = date.getMonth() + 1; // 1–12
  const day = date.getDate();

  if (month === 11) {
    return 0.25;
  }

  const holidayCategories = ["electronics", "books"];
  const hasHolidayCategory = categories.some((cat) =>
    holidayCategories.includes(cat)
  );

  if (month === 12 && hasHolidayCategory) {
    return 0.15;
  }

  return 0;
}

function applyLocationPricing(price, location) {
  if (location === "EU") return price * 1.15;
  if (location === "ASIA") return price * 0.95;
  return price; // US
}

function calculateFinalPrice({ items, customer, date = new Date() }) {
  let basePrice = 0;
  let totalQuantity = 0;
  const categories = [];

  for (const item of items) {
    basePrice += item.price * item.quantity;
    totalQuantity += item.quantity;
    categories.push(item.category);
  }

  const priceWithLocation = roundMoney(
    applyLocationPricing(basePrice, customer.location)
  );

  const volumeDiscount = getVolumeDiscount(totalQuantity);
  const seasonalDiscount = getSeasonalDiscount(date, categories);

  const bestDiscount = Math.max(volumeDiscount, seasonalDiscount);

  const finalPrice = roundMoney(priceWithLocation * (1 - bestDiscount));

  return {
    basePrice,
    priceWithLocation,
    bestDiscount,
    finalPrice,
  };
}

module.exports = { calculateFinalPrice };
