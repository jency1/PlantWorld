const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A plant must have a name'],
    unique: true,
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
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
    required: [true, 'A plant must have a short description'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A plant must have a description'],
  },
  category: {
    type: String,
    required: [true, 'A plant must have a category'],
    trim: true,
  },
  tag: {
    type: String,
    required: [true, 'A plant must have a tag'],

    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'A plant must have a quantity'],
    min: [0, 'Quantity cannot be negative'],
    default: 20,
  },
  availability: {
    type: String,
    enum: ['In Stock', 'Out Of Stock', 'Up Coming'],
    default: 'In Stock',
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
  images: [String],
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation and not on update
        return val < this.price; // Ensure discount is less than the price
      },
      message: 'Discount price ({VALUE}) should be below the regular price',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
