const mongoose = require("mongoose");

// Phone Schema
const phoneSchema = new mongoose.Schema({
  phoneId: String,
  userId: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ["available", "rented", "owned"],
    default: "available",
  },
  totalCost: Number,
  paidAmount: { type: Number, default: 0 },
  installments: Number,
  rentalDate: { type: Date, default: Date.now },
  returnDate: Date,
});

module.exports = mongoose.model("Phone", phoneSchema);
