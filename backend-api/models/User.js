const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const _ = require('lodash');

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt(this.password, salt);
    next();
})

userSchema.methods.genAuthToken = function () {
    return jwt.sign(_.pick(this, ['_id', 'role']), process.env.JWT_SECRET)
}

userSchema.methods.isPasswordValid = async function (body_password) {
    return await bcrypt.compare(body_password, this.password);
}

module.exports = mongoose.model('User', userSchema);