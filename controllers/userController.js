const db = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER USER
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check existing email
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, data) => {
            if (err) return res.status(500).json({ message: "Database error" });

            if (data.length > 0) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hash = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, hash],
                (err) => {
                    if (err) return res.status(500).json({ message: "Insert failed" });

                    res.json({ message: "User registered successfully" });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN USER
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (data.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = data[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
};