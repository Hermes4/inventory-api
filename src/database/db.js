const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const path = require("path");

const file = path.join(__dirname, "db.json");
const adapter = new JSONFile(file);

const defaultData = {
  products: [],
  orders: [],
  customers: [],
};

const db = new Low(adapter, defaultData);

async function initDB() {
  await db.read();
  await db.write();
}

module.exports = { db, initDB };
