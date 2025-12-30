const express = require("express");
const { initDB } = require("./database/db");
const productsRoutes = require("./modules/products/routes");

const app = express();
app.use(express.json());

initDB();

app.use("/products", productsRoutes);

module.exports = app;
