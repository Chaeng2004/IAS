const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../config/database');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body; 

        if (!email || !password || password.length < 8) {
            return res.status(400).json({ error: "Invalid input data." });
        }
        if (users.find(u => u.email === email)) { 
            return res.status(400).json({ error: "User already exists." });
        }
     
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ email, password: hashedPassword }); 
        res.status(201).json({ message: "User registered successfully!" });
    } catch {
        res.status(500).json({ error: "Registration failed." });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    const genericError = "Invalid email or password.";

    if (!user) return res.status(401).json({ error: genericError });

    try {
        if (await bcrypt.compare(password, user.password)) {
          
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: genericError });
        }
    } catch {
        res.status(500).json({ error: "Login error." });
    }
};

const getWebGoatLink = (req, res) => {
    res.json({ url: process.env.WEBGOAT_LESSON_URL });
};

module.exports = { registerUser, loginUser, getWebGoatLink };