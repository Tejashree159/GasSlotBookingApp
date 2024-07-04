// module.js

const mongoose = require('mongoose');

// Define Mongoose schema for Slot
const SlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  capacity: { type: Number, required: true },
  booked: { type: Number, default: 0 },
});

// Define Mongoose model for Slot
const Slot = mongoose.model('Slot', SlotSchema);

// Function to retrieve all slots
async function getAllSlots() {
  try {
    const slots = await Slot.find();
    return slots;
  } catch (error) {
    throw new Error(`Error fetching slots: ${error.message}`);
  }
}

// Function to create a new slot
async function createSlot(slotData) {
  try {
    const newSlot = await Slot.create(slotData);
    return newSlot;
  } catch (error) {
    throw new Error(`Error creating slot: ${error.message}`);
  }
}

// Function to book a slot
async function bookSlot(slotId) {
  try {
    const slot = await Slot.findById(slotId);
    if (!slot) {
      throw new Error('Slot not found');
    }

    if (slot.booked >= slot.capacity) {
      throw new Error('Slot fully booked');
    }

    slot.booked++;
    await slot.save();
    return slot;
  } catch (error) {
    throw new Error(`Error booking slot: ${error.message}`);
  }
}

// Export functions and models
module.exports = {
  Slot,
  getAllSlots,
  createSlot,
  bookSlot,
};
