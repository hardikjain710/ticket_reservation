const express = require("express");
const router = express.Router();
const { addTrain, searchTrains, getSeats } = require("../controllers/trainController");

router.post("/add", addTrain);
router.post("/search", searchTrains);
router.get("/:id/seats", getSeats);

module.exports = router;