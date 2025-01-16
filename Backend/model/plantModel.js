const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A plant must have a name'],
    unique: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A plant must have a price'],
  },
  shortDescription: {
    type: String,
    trim: true,
    required: [true, 'A plant must have a description'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A plant must have a description'],
  },
  category: {
    type: String,
    required: [true, 'A plant must have a category'],
  },
  tag: {
    type: String,
    required: [true, 'A plant must have a tag'],
  },
  color: {
    type: [String],
    required: [true, 'A plant must have at least one color'],
  },
  imageCover: {
    type: String,
    required: [true, 'A plant must have a cover image'],
  },
  plantCareTips: {
    type: [String], // Array of strings to store multiple tips
    required: [true, 'A plant must have care tips'],
    validate: {
      validator: function (val) {
        return val.length > 0; // Ensure at least one care tip is provided
      },
      message: 'There should be at least one care tip provided',
    },
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
