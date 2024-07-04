const mongoose = require("mongoose");
const BookingSchema= new mongoose. Schema( {
    username: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
    station: { type: mongoose.Schema.Types.ObjectId, ref: "GasStation", required: true },
    bookingStatus: { type: String, enum: ["Pending", "Confirmed", "Canceled"], default: "Pending" },
     }, { timestamps: true }
);

module.exports = mongoose.model ("Booking",BookingSchema);