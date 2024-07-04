const express = require("express");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/role")
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const router = express.Router();
require('dotenv').config();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/bookings", authMiddleware, upload.array('media'), async (req, res) => {
  const { user, stationname, slot } = req.body;
  
  try {
    const mediaUrls = await Promise.all(req.files.map(async (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        });
        uploadStream.end(file.buffer);
      });
    }));

    const booking = new Booking({
      user: req.user.id, 
      slot: slot,
      images: mediaUrls.filter(url => url.endsWith('.jpg') || url.endsWith('.png'))
    });

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error booking slot" });
  }
});

router.get("/slot/:slotId/bookings", async (req, res) => {
  const { slotId } = req.params;
  try {
    const bookings = await Booking.find({ slot: slotId }).populate("user");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

module.exports = router;
