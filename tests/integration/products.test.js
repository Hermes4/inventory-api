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

beforeEach(() => {
  db.data.products = [];
  db.data.orders = [];
});

describe("Products API", () => {
  test("POST /products creates a product", async () => {
    const res = await request(app).post("/products").send({
      name: "Test Product",
      description: "Test desc",
      price: 10,
      stock: 5,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Product");
  });

  test("GET /products returns products list", async () => {
    await request(app).post("/products").send({
      name: "Product 1",
      description: "Desc",
      price: 10,
      stock: 5,
    });

    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
