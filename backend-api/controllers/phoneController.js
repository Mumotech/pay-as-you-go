const Phone = require('../models/Phone');
const asyncMiddleware = require('../middleware/async');

//@desc Make Payments
//@route POST /api/v1/phones/make-payment
//@access private
exports.makePayment = asyncMiddleware(async (req, res) => {
    const { phoneId, amount } = req.body;
    const phone = await Phone.findOne({ phoneId, userId: req.user.userId });
    if (phone) {
        phone.paidAmount += amount;
        if (phone.paidAmount >= phone.totalCost) {
            phone.status = 'owned';
        }
        await phone.save();
        res.status(200).json({msg: phone});
    } 
        res.status(404).json({msg: 'Phone not found'});
    
})

//@desc Track Phone
//@route GET /api/v1/phones/track-phone/:phoneId
//@access private
exports.trackPhone = asyncMiddleware(async (req, res) => {
    const { phoneId } = req.params;
    // Implement tracking logic using Life360 API or similar
    res.status(200).json({ msg: 'Tracked location' });
})

//@desc Lock Phone
//@route POST /api/v1/phones/lock-phone/:phoneId
//@access private
exports.lockPhone = asyncMiddleware(async (req, res) => {
    const { phoneId } = req.params;
    if (req.user.role === 'admin') {
        // Implement locking logic using Google Find My Device API or similar
        res.status(200).json({msg: 'Phone Locked'});
    } 
        res.status(403).json({msg: 'Unauthorized'});
    
})

//@desc Rent Phone
//@route POST /api/v1/phones/rent-phone
//@access private
exports.rentPhone = asyncMiddleware(async (req, res) => {
    const { phoneId, installments } = req.body;
    const phone = new Phone({ phoneId, userId: req.user.userId, installments });
    await phone.save();
    res.status(201).send(phone);
})