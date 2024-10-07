const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/TempUser');
const nodemailer = require('nodemailer');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    console.log('Signup request received', req.body);
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup Error:', error);  // Log the error to the terminal
    res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error('Login Error:', error);  // Log the error to the terminal
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Forgot Password (Send reset link or similar)
router.post('/forgot-password', async(req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found with this email' });
        }

        // Generate reset token (using JWT or a random token)
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' }); // 15 minutes expiry

        // Send an email to the user with the reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Set up email transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
        });

        // Send the email with reset instructions
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 15 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email', error });
            }
            res.status(200).json({ message: 'Password reset link sent to email' });
        });

    } catch (error) {
        console.error('Error in forgot-password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    res.send('Reset password route is working');
    const { token } = req.params;  // get the reset token from the URL
    const { password } = req.body; // get the new password from the request body

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by the decoded token's ID
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        console.error('Error in reset-password route:', error);

        // Handle token expiry or invalid token
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Reset link has expired' });
        }

        res.status(500).json({ message: 'Invalid or expired token', error });
    }
});



module.exports = router;
