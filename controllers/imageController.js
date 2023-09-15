const mongoose = require('mongoose');
const path = require('path');
const Image = require('../models/imageModel');

exports.uploadImage = async (req, res) => {
  try {
    const { filename, path } = req.file;
    const image = new Image({ filename, path });
    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteImage = async (req, res) => {
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
};
