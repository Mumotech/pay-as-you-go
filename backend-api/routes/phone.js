const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const phoneController = require('../controllers/phoneController');

// auth middleware for all routes
router.use(auth)

// Make Payment
router.post('/make-payment', phoneController.makePayment);

// Track Phone
router.get('/track-phone/:phoneId', phoneController.trackPhone);

// Lock Phone
router.post('/lock-phone/:phoneId', phoneController.lockPhone);

// Rent Phone
router.post('/rent-phone', phoneController.rentPhone);


module.exports = router;