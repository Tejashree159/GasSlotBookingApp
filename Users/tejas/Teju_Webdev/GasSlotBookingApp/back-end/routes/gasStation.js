const express = require('express');
const GasStation = require('../models/GasStation');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a new gas station
router.post('/gasstations', authMiddleware, async (req, res) => {
  const { name, address } = req.body;
  try {
    const gasStation = new GasStation({ name, address });
    await gasStation.save();
    res.json(gasStation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating gas station' });
  }
});

// Get all gas stations
router.get('/gasstations', async (req, res) => {
  try {
    const gasStations = await GasStation.find();
    res.json(gasStations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gas stations' });
  }
});

// Get a gas station by ID
router.get('/gasstations/:gasStationId', async (req, res) => {
  const { gasStationId } = req.params;
  try {
    const gasStation = await GasStation.findById(gasStationId);
    if (!gasStation) {
      return res.status(404).json({ message: 'Gas station not found' });
    }
    res.json(gasStation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gas station' });
  }
});

// Update a gas station
router.put('/gasstations/:gasStationId', authMiddleware, async (req, res) => {
  const { gasStationId } = req.params;
  const { name, address } = req.body;
  try {
    const gasStation = await GasStation.findByIdAndUpdate(
      gasStationId,
      { name, address },
      { new: true }
    );
    if (!gasStation) {
      return res.status(404).json({ message: 'Gas station not found' });
    }
    res.json(gasStation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gas station' });
  }
});

// Delete a gas station
router.delete('/gasstations/:gasStationId', authMiddleware, async (req, res) => {
  const { gasStationId } = req.params;
  try {
    const gasStation = await GasStation.findByIdAndDelete(gasStationId);
    if (!gasStation) {
      return res.status(404).json({ message: 'Gas station not found' });
    }
    res.json({ message: 'Gas station deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gas station' });
  }
});

module.exports = router;