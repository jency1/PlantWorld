// controllers/cartController.js
const User = require('./../model/userModel');
// const User = require('../models/userModel'); // adjust the path if needed

// exports.addToCart = async (req, res) => {
//   try {
//     const { plantId, quantity, price } = req.body;
//     const userId = req.user.id;

//     const user = await User.findById(userId);

//     if (!user.cart) {
//       user.cart = []; // Initialize cart if undefined
//     }

//     const existingItemIndex = user.cart.findIndex(
//       (item) => item.plantId && item.plantId.toString() === plantId
//     );

//     if (existingItemIndex >= 0) {
//       // If item already in cart, update quantity and price
//       user.cart[existingItemIndex].quantity += quantity;
//       user.cart[existingItemIndex].price = price;
//       user.cart[existingItemIndex].total =
//         user.cart[existingItemIndex].quantity *
//         user.cart[existingItemIndex].price;
//     } else {
//       // Add new item to cart
//       total = quantity * price;
//       user.cart.push({ plantId, quantity, price, total });
//     }

//     // Save user without triggering password validation
//     await user.save({ validateBeforeSave: false });

//     res.status(200).json({ status: 'success', cart: user.cart });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: 'Failed to add to cart',
//       error: err.message,
//     });
//   }
// };

exports.addToCart = async (req, res) => {
  try {
    const { plantId, quantity, price } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user.cart) {
      user.cart = []; // Initialize cart if undefined
    }

    const Plant = require('./../model/plantModel');
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Plant not found' });
    }

    // Check availability
    if (plant.availability === 'Out Of Stock') {
      return res.status(400).json({
        status: 'fail',
        message: 'This plant is currently out of stock',
      });
    }

    // Check if enough stock is available
    const existingItemIndex = user.cart.findIndex(
      (item) => item.plantId && item.plantId.toString() === plantId
    );

    const totalRequestedQty =
      existingItemIndex >= 0
        ? user.cart[existingItemIndex].quantity + quantity
        : quantity;

    if (totalRequestedQty > plant.quantity) {
      return res.status(400).json({
        status: 'fail',
        message: `Only ${plant.quantity} quantities are in stock`,
      });
    }

    if (existingItemIndex >= 0) {
      // If item already in cart, update quantity and price
      user.cart[existingItemIndex].quantity += quantity;
      user.cart[existingItemIndex].price = price;
      user.cart[existingItemIndex].total =
        user.cart[existingItemIndex].quantity *
        user.cart[existingItemIndex].price;
    } else {
      // Add new item to cart
      total = quantity * price;
      user.cart.push({ plantId, quantity, price, total });
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

    const plant = await require('./../model/plantModel').findById(plantId);
    if (!plant) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Plant not found' });
    }

    if (quantity !== undefined && quantity > plant.quantity) {
      return res.status(400).json({
        status: 'fail',
        message: `Only ${plant.quantity} quantities are in stock`,
      });
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

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: 'cart.plantId', // Populating the plantId field in each cart item
      model: 'Plant', // The model we want to populate from (Plant)
    });
    if (!user || !user.cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'User or cart not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      cart: user.cart,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve cart',
      error: err.message,
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || !user.cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'User or cart not found',
      });
    }

    user.cart = []; // Clear all items from the cart

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared successfully',
      cart: user.cart,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to clear cart',
      error: err.message,
    });
  }
};

exports.checkCartAvailability = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('cart.plantId');

    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Cart is empty or user not found',
      });
    }

    const unavailableItems = [];

    for (const item of user.cart) {
      const plant = await require('./../model/plantModel').findById(
        item.plantId._id || item.plantId
      );

      if (!plant) {
        unavailableItems.push({
          name: '[Deleted Plant]',
          message: 'Plant no longer exists',
        });
        continue;
      }

      if (plant.quantity < item.quantity) {
        unavailableItems.push({
          name: plant.name,
          requested: item.quantity,
          available: plant.quantity,
          message: `Only ${plant.quantity} left in stock`,
        });
      } else if (plant.availability === 'Out Of Stock') {
        unavailableItems.push({
          name: plant.name,
          requested: item.quantity,
          available: 0,
          message: 'Currently out of stock',
        });
      }
    }

    if (unavailableItems.length > 0) {
      return res.status(200).json({
        status: 'fail',
        message:
          'Some items in your cart are no longer available in the desired quantity',
        unavailableItems,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'All items in cart are available for checkout',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to check cart availability',
      error: err.message,
    });
  }
};
