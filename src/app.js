const express = require("express");
const { initDB } = require("./database/db");
const productsRoutes = require("./modules/products/routes");
const ordersRoutes = require("./modules/orders/routes");

const app = express();
app.use(express.json());

initDB();

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

module.exports = app;
