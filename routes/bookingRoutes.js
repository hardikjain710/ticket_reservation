const express = require("express");
const router = express.Router();

const {
    bookTicket,
    cancelBooking,
    getHistory
} = require("../controllers/bookingController");

router.post("/book", bookTicket);
router.post("/cancel", cancelBooking);
router.get("/history/:user_id", getHistory);

module.exports = router;