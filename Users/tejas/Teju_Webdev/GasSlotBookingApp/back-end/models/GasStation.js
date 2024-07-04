const mongoose = require("mongoose");
const GasStationSchema= new mongoose. Schema( {
     stationId: { type: String, required: true, unique: true },
     stationname: { type: String, required: true, unique: true },
     contact: {type: String, required: true, unique: true }, 
     address: { type: String, required: true },
     //user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
     //booking: [{type: mongoose.Schema.Types.ObjectId, ref:"Booking"}],
     //delivery: [{type: mongoose.Schema.Types.ObjectId, ref:"Delivery"}]
     }, { timestamps: true }
);

module.exports = mongoose.model ("GasStation",GasStationSchema);