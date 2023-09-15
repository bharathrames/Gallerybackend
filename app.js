const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const imageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.send("<h5>Gallery App</h5>");
});

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use('/api', imageRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
