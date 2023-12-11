const express = require("express");
const router = express.Router();
const CharityController = require("../controllers/CharityController");

router.get("/", CharityController.index);
router.get("/show", CharityController.show);
router.post("/add", CharityController.Add);
router.put("/update", CharityController.update);
router.delete("/delete", CharityController.destroy);

module.exports = router;
