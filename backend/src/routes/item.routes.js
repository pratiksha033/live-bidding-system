const router = require("express").Router();
const { getItems } = require("../controllers/item.controller");

router.get("/", getItems);

module.exports = router;
