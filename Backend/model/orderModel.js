const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      plantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
        required: true,
      },
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  orderTotal: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expectedDelivery: {
    type: Date,
    required: true,
  },
  status: [
    {
      stage: {
        type: String,
        enum: [
          'Order Received',
          'Order Shipped',
          'Out for Delivery',
          'Order Delivered',
          'Order Cancelled',
        ],
        required: true,
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  addressLine1: String,
  addressLine2: String,
  area: String,
  city: String,
  state: String,
  pincode: String,
});

module.exports = mongoose.model('Order', orderSchema);
