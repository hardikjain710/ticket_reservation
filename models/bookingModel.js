const db = require("../config/db");

module.exports = {
    createBooking: (userId, trainId, seats, callback) => {
        const sql = "INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)";
        db.query(sql, [userId, trainId, seats], callback);
    },

    getBookingsByUser: (userId, callback) => {
        const sql = `
            SELECT bookings.*, trains.name AS train_name, trains.source, trains.destination
            FROM bookings
            JOIN trains ON bookings.train_id = trains.id
            WHERE bookings.user_id = ?
        `;
        db.query(sql, [userId], callback);
    }
};