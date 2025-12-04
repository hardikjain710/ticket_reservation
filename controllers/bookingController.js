const db = require("../config/db");

// Book Ticket
exports.bookTicket = (req, res) => {
    const { user_id, train_id, seat_number, booking_date } = req.body;

    if (!user_id || !train_id || !seat_number || !booking_date) {
        return res.status(400).json({ message: "All fields required" });
    }

    db.query(
        "INSERT INTO bookings (user_id, train_id, seat_number, booking_date, status) VALUES (?, ?, ?, ?, 'booked')",
        [user_id, train_id, seat_number, booking_date],
        (err) => {
            if (err) return res.status(500).json({ message: "Error booking ticket" });

            // reduce seat count
            db.query(
                "UPDATE trains SET seats = seats - 1 WHERE id = ?",
                [train_id]
            );

            res.json({ message: "Ticket Booked" });
        }
    );
};

// Cancel Booking
exports.cancelBooking = (req, res) => {
    const { booking_id, train_id } = req.body;

    if (!booking_id || !train_id) {
        return res.status(400).json({ message: "All fields required" });
    }

    db.query("UPDATE bookings SET status='cancelled' WHERE id=?", [booking_id]);
    db.query("UPDATE trains SET seats = seats + 1 WHERE id=?", [train_id]);

    res.json({ message: "Booking cancelled" });
};

// Get booking history
exports.getHistory = (req, res) => {
    db.query(
        "SELECT * FROM bookings WHERE user_id=?",
        [req.params.user_id],
        (err, data) => {
            if (err) return res.status(500).json({ message: "Error" });
            res.json(data);
        }
    );
};