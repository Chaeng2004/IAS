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
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        users.push({ email, password: hashedPassword, isVerified: false, otp }); 

        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: { email: process.env.BREVO_SENDER_EMAIL, name: "Security App" },
                to: [{ email: email }],
                subject: "Your Verification Code",
                htmlContent: `<html><body><h1>Welcome!</h1><p>Your 6-digit verification code is: <strong style="font-size:24px; color:#e11d48;">${otp}</strong></p></body></html>`
            })
        });

        if (!brevoResponse.ok) {
            console.error("Brevo Error:", await brevoResponse.text());
        }

        res.status(201).json({ message: "OTP sent to email.", email: email });
    } catch (err) {
        res.status(500).json({ error: "Registration failed." });
    }
};

const verifyOTP = (req, res) => {
    const { email, otp } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) return res.status(404).json({ error: "User not found." });
    if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP code." });

    user.isVerified = true;
    user.otp = null; 

    res.json({ message: "Account successfully verified!" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    const genericError = "Invalid email or password.";

    if (!user) return res.status(401).json({ error: genericError });
    
    if (!user.isVerified) return res.status(403).json({ error: "Please verify your email via OTP first." });

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

module.exports = { registerUser, verifyOTP, loginUser, getWebGoatLink };