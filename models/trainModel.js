const db = require("../config/db");

module.exports = {
    addTrain: (name, source, destination, totalSeats, departureTime, callback) => {
        const sql = "INSERT INTO trains (name, source, destination, total_seats, available_seats, departure_time) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [name, source, destination, totalSeats, totalSeats, departureTime], callback);
    },

    getAllTrains: (callback) => {
        const sql = "SELECT * FROM trains";
        db.query(sql, callback);
    },

    getTrainById: (id, callback) => {
        const sql = "SELECT * FROM trains WHERE id = ?";
        db.query(sql, [id], callback);
    },

    updateSeats: (trainId, seats, callback) => {
        const sql = "UPDATE trains SET available_seats = available_seats - ? WHERE id = ?";
        db.query(sql, [seats, trainId], callback);
    }
};