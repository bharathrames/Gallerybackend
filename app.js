const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config(); 

app.use(cors());

app.get("/", function (req, res) {
  res.send("<h5>Gallery App</h5>");
});

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const Image = mongoose.model('Image', imageSchema);

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));
app.use(express.json());


app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename, path } = req.file;
    const image = new Image({ filename, path });
    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.delete('/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    if (!image) {
      res.status(404).json({ error: 'Image not found' });
    } else {
      res.json({ message: 'Image deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});