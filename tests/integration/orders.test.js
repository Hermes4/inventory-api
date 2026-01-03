jest.mock("uuid", () => ({
  v4: () => "test-uuid",
}));

jest.mock("../../src/database/db", () => {
  return {
    initDB: jest.fn(),
    db: {
      data: {
        products: [],
        orders: [],
        customers: [],
      },
      read: jest.fn(),
      write: jest.fn(),
    },
  };
});

const request = require("supertest");
const app = require("../../src/app");
const { db } = require("../../src/database/db");

let productId;

beforeEach(() => {
  db.data.products = [];
  db.data.orders = [];

  const product = {
    id: "prod-1",
    name: "Test product",
    description: "Desc",
    price: 10,
    stock: 5,
    category: "electronics",
  };

  db.data.products.push(product);
  productId = product.id;
});

describe("Orders API", () => {
  test("POST /orders creates order and reduces stock", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        customerId: "cust-1",
        products: [{ productId, quantity: 2 }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.totalPrice).toBeDefined();

    const updatedProduct = db.data.products.find((p) => p.id === productId);
    expect(updatedProduct.stock).toBe(3);
  });

  test("POST /orders fails if insufficient stock", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        customerId: "cust-1",
        products: [{ productId, quantity: 10 }],
      });

    expect(res.statusCode).toBe(409);
  });
});
