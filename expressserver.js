/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// express server
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')('your_stripe_secret_key');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/phone_rental', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', UserSchema);

// Phone Schema
const PhoneSchema = new mongoose.Schema({
    phoneId: String,
    userId: mongoose.Schema.Types.ObjectId,
    status: { type: String, enum: ['available', 'rented', 'owned'], default: 'available' },
    totalCost: Number,
    paidAmount: { type: Number, default: 0 },
    installments: Number,
    rentalDate: { type: Date, default: Date.now },
    returnDate: Date
});

const Phone = mongoose.model('Phone', PhoneSchema);

// JWT Secret
const JWT_SECRET = 'your_jwt_secret';

// User Registration
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User registered');
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
        res.status(200).json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware for Authentication
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Rent Phone
app.post('/rent-phone', authenticateJWT, async (req, res) => {
    const { phoneId, installments } = req.body;
    const phone = new Phone({ phoneId, userId: req.user.userId, installments });
    await phone.save();
    res.status(201).send(phone);
});

// Make Payment
app.post('/make-payment', authenticateJWT, async (req, res) => {
    const { phoneId, amount } = req.body;
    const phone = await Phone.findOne({ phoneId, userId: req.user.userId });
    if (phone) {
        phone.paidAmount += amount;
        if (phone.paidAmount >= phone.totalCost) {
            phone.status = 'owned';
        }
        await phone.save();
        res.status(200).send(phone);
    } else {
        res.status(404).send('Phone not found');
    }
});

// Track Phone
app.get('/track-phone/:phoneId', authenticateJWT, async (req, res) => {
    const { phoneId } = req.params;
    // Implement tracking logic using Life360 API or similar
    res.status(200).json({ location: 'Tracked location' });
});

// Lock Phone
app.post('/lock-phone/:phoneId', authenticateJWT, async (req, res) => {
    const { phoneId } = req.params;
    if (req.user.role === 'admin') {
        // Implement locking logic using Google Find My Device API or similar
        res.status(200).send('Phone locked');
    } else {
        res.status(403).send('Unauthorized');
    }
});

app.listen(port, () => {
    console.log(Phone rental system running on port ${port});
});