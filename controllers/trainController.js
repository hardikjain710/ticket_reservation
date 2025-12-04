const db = require("../config/db");
const Train = require("../models/trainModel");

// Add Train
exports.addTrain = (req, res) => {
    const { name, source, destination, departure, arrival, seats } = req.body;

    if (!name || !source || !destination || !departure || !arrival || !seats) {
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query(
        "INSERT INTO trains (name, source, destination, departure, arrival, seats) VALUES (?, ?, ?, ?, ?, ?)",
        [name, source, destination, departure, arrival, seats],
        (err) => {
            if (err) return res.status(500).json({ message: "Error adding train" });
            res.json({ message: "Train added" });
        }
    );
};

// Search trains by source & destination
exports.searchTrains = (req, res) => {
    const { source, destination } = req.body;

    db.query(
        "SELECT * FROM trains WHERE source = ? AND destination = ?",
        [source, destination],
        (err, data) => {
            if (err) return res.status(500).json({ message: "Error searching trains" });
            res.json(data);
        }
    );
};

// Get seats for a train
exports.getSeats = (req, res) => {
    db.query(
        "SELECT seats FROM trains WHERE id = ?",
        [req.params.id],
        (err, data) => {
            if (err) return res.status(500).json({ message: "Error fetching seats" });
            if (data.length === 0) return res.status(404).json({ message: "Train not found" });
            res.json(data[0]);
        }
    );
};