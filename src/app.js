const express = require("express");
const { initDB } = require("./database/db");

const app = express();
app.use(express.json());

initDB();

module.exports = app;
