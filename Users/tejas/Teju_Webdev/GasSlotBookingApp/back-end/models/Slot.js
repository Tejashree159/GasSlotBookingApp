const mongoose = require("mongoose");
const SlotSchema= new mongoose. Schema( {
     slotId: { type: String, required: true, unique: true },
     stationname: {type: mongoose.Schema.Types.ObjectId, ref:"GasStation"}, 
     available: { type: Boolean, required: true },
     
     }, { timestamps: true }
);

module.exports = mongoose.model.Slot || mongoose.model ("Slot",SlotSchema);