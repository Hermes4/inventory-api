const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/", controller.getProducts);
router.post("/", controller.createProduct);
router.post("/:id/restock", controller.restockProduct);
router.post("/:id/sell", controller.sellProduct);

module.exports = router;
