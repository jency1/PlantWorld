// controllers/cartController.js
const User = require('./../model/userModel');
// const User = require('../models/userModel'); // adjust the path if needed

exports.addToCart = async (req, res) => {
  try {
    const { plantId, quantity, price } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user.cart) {
      user.cart = []; // Initialize cart if undefined
    }

    const existingItemIndex = user.cart.findIndex(
      (item) => item.plantId && item.plantId.toString() === plantId
    );

    if (existingItemIndex >= 0) {
      // If item already in cart, update quantity and price
      user.cart[existingItemIndex].quantity += quantity;
      user.cart[existingItemIndex].price = price;
      user.cart[existingItemIndex].total =
        user.cart[existingItemIndex].quantity *
        user.cart[existingItemIndex].price;
    } else {
      // Add new item to cart
      user.cart.push({ plantId, quantity, price });
    }

    // Save user without triggering password validation
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ status: 'success', cart: user.cart });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to add to cart',
      error: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { plantId, quantity, price } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user.cart) {
      return res.status(400).json({ status: 'fail', message: 'Cart is empty' });
    }

    const item = user.cart.find(
      (item) => item.plantId && item.plantId.toString() === plantId
    );

    if (!item) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Item not found in cart' });
    }

    if (quantity !== undefined) item.quantity = quantity;
    if (price !== undefined) item.price = price;

    item.total = item.quantity * item.price;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ status: 'success', cart: user.cart });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update cart',
      error: err.message,
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { plantId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || !user.cart) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'User or cart not found' });
    }

    const initialLength = user.cart.length;

    user.cart = user.cart.filter(
      (item) => item.plantId && item.plantId.toString() !== plantId
    );

    if (user.cart.length === initialLength) {
      return res.status(404).json({
        status: 'fail',
        message: 'Item not found in cart',
      });
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ status: 'success', cart: user.cart });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete cart item',
      error: err.message,
    });
  }
};

exports.getCartTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'User or cart not found',
      });
    }

    const total = user.cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    res.status(200).json({
      status: 'success',
      cartTotal: total,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to calculate cart total',
      error: err.message,
    });
  }
};

// controllers/cartController.js

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || !user.cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'User or cart not found',
      });
    }

    res.status(200).json({
      status: 'success',
      cart: user.cart,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve cart',
      error: err.message,
    });
  }
};
