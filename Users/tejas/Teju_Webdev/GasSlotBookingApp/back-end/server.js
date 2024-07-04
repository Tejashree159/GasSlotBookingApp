
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { getAllSlots, createSlot, bookSlot } = require('./module'); // Assuming module.js is in the same directory as server.js
const authRoute = require('./routes/auth');
const slotRoutes = require('./routes/slot');
const bookingRoutes = require('./routes/booking');
const gasStationRoutes = require('./routes/gasStation');


dotenv.config();


const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());


app.use('/apiAuth', authRoute);
app.use('/apiSlot', slotRoutes);
app.use('/apiBooking', bookingRoutes);
app.use('/apiGasStation', gasStationRoutes);


app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.get('/js/module.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../client/build/js', 'module.js'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');

  // Example route to get all slots
  app.get('/api/slots', async (req, res) => {
    try {
      const slots = await getAllSlots();
      res.json(slots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Example route to create a new slot
  app.post('/api/slots', async (req, res) => {
    try {
      const newSlot = await createSlot(req.body);
      res.status(201).json(newSlot);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Example route to book a slot
  app.post('/api/slots/:slotId/book', async (req, res) => {
    const { slotId } = req.params;
    try {
      const bookedSlot = await bookSlot(slotId);
      res.json(bookedSlot);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Start the Express server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Loaded environment variables:');
    console.log(process.env);
    console.log(`cloud_name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`api_key: ${process.env.CLOUDINARY_API_KEY}`);
    console.log(`api_secret: ${process.env.CLOUDINARY_API_SECRET}`);
  });

})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});
