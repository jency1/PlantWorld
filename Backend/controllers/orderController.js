// controllers/orderController.js
const Order = require('../model/orderModel');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const Plant = require('../model/plantModel');
const sendEmail = require('../utils/email');

// exports.createOrder = catchAsync(async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     mobile,
//     email,
//     addressLine1,
//     addressLine2,
//     area,
//     city,
//     state,
//     pincode,
//     paymentId,
//   } = req.body;

//   // Get user and cart
//   const user = await User.findById(req.user.id).select('+cart');
//   if (!user || !user.cart || user.cart.length === 0) {
//     return res.status(400).json({ status: 'fail', message: 'Cart is empty' });
//   }

//   // Add 'total' field per item
//   const items = user.cart.map((item) => ({
//     plantId: item.plantId._id || item.plantId,
//     quantity: item.quantity,
//     price: item.price,
//     total: item.quantity * item.price,
//   }));

//   // Calculate overall order total
//   const orderTotal = items.reduce((acc, item) => acc + item.total, 0);

//   const expectedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   // Create order
//   const order = await Order.create({
//     user: req.user.id,
//     items,
//     orderTotal,
//     paymentId,
//     expectedDelivery,
//     status: [{ stage: 'Order Received' }],
//     firstName,
//     lastName,
//     mobile,
//     email,
//     addressLine1,
//     addressLine2,
//     area,
//     city,
//     state,
//     pincode,
//   });

//   // Link order to user and clear cart
//   user.orders.push(order._id);
//   user.cart = [];
//   await user.save({ validateBeforeSave: false });

//   res.status(201).json({
//     status: 'success',
//     order,
//   });
// });

// controllers/orderController.js
// const Order = require('../model/orderModel');
// const User = require('../model/userModel');
// const Plant = require('../model/plantModel');
// const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    mobile,
    email,
    addressLine1,
    addressLine2,
    area,
    city,
    state,
    pincode,
    paymentId,
  } = req.body;

  // 1. Get user and their cart
  const user = await User.findById(req.user.id).populate('cart.plantId');

  if (!user || !user.cart || user.cart.length === 0) {
    return res.status(400).json({ status: 'fail', message: 'Cart is empty' });
  }

  // 2. Prepare order items
  const items = user.cart.map((item) => ({
    plantId: item.plantId._id || item.plantId,
    quantity: item.quantity,
    price: item.price,
    total: item.quantity * item.price,
    plantRef: item.plantId, // for email use only
  }));

  // 3. Calculate total and delivery date
  const orderTotal = items.reduce((acc, item) => acc + item.total, 0);
  const expectedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 days

  // 4. Create order
  const order = await Order.create({
    user: req.user.id,
    items,
    orderTotal,
    paymentId,
    expectedDelivery,
    status: [{ stage: 'Order Received' }],
    firstName,
    lastName,
    mobile,
    email,
    addressLine1,
    addressLine2,
    area,
    city,
    state,
    pincode,
  });

  // 5. Update plant stock
  for (const item of items) {
    const plant = await Plant.findById(item.plantId);
    if (plant) {
      plant.quantity -= item.quantity;
      if (plant.quantity <= 0) {
        plant.quantity = 0;
        plant.availability = 'Out Of Stock';
      }
      await plant.save({ validateBeforeSave: false });
    }
  }

  // 6. Clear user cart and save order
  user.orders.push(order._id);
  user.cart = [];
  await user.save({ validateBeforeSave: false });

  // 7. Send confirmation email
  const emailMessage = `
    <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
      <p>Hi <strong>${firstName} ${lastName}</strong>,</p>

      <p>Thank you for your order at <strong style="color:green">PlantWorld 🌿</strong>!</p>

      <p>Your order has been successfully placed and is now being processed.</p>

      <p><strong>Order Total:</strong> ₹${orderTotal}</p>
      <p><strong>Expected Delivery:</strong> ${expectedDelivery.toDateString()}</p>

      <hr />
      <h3>Order Summary:</h3>
      ${items
        .map(
          (item) => `
        <p>
          <strong>Plant:</strong> ${item.plantRef.name}<br/>
          <strong>Quantity:</strong> ${item.quantity}<br/>
          <strong>Total:</strong> ₹${item.total}
        </p>
      `
        )
        .join('')}
      <hr/>

      <p>If you have any questions, feel free to reach out to us.</p>

      <p>With green regards,<br/>
      <strong style="color:green">The PlantWorld Team 🌱</strong></p>
    </div>
  `;

  await sendEmail({
    email,
    subject: '🌿 Your PlantWorld Order Confirmation',
    message: emailMessage,
  });

  // 8. Send response
  res.status(201).json({
    status: 'success',
    order,
  });
});

exports.getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    'items.plantId'
  );
  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  if (!newStatus) {
    return res.status(400).json({
      status: 'fail',
      message: 'New status is required',
    });
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Order not found',
    });
  }

  // Append the new status with current timestamp
  order.status.push({
    stage: newStatus,
    changedAt: new Date(),
  });

  await order.save();

  res.status(200).json({
    status: 'success',
    message: `Order status updated to ${newStatus}`,
    order,
  });
});

exports.cancelOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Order not found',
    });
  }

  // ✅ Check if the logged-in user owns the order
  if (order.user.toString() !== req.user.id) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to cancel this order',
    });
  }

  const currentStatus = order.status[order.status.length - 1]?.stage;

  if (currentStatus !== 'Order Received') {
    return res.status(400).json({
      status: 'fail',
      message: `Cannot cancel order. Current status is "${currentStatus}". Only "Order Received" orders can be cancelled.`,
    });
  }

  order.status.push({
    stage: 'Order Cancelled',
    changedAt: new Date(),
  });

  await order.save();

  res.status(200).json({
    status: 'success',
    message: 'Order cancelled successfully',
    order,
  });
});

exports.getOrderById = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate('items.plantId user');

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Order not found',
    });
  }

  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find()
    .populate('items.plantId')
    .populate('user', 'name email');

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.getMyOrderById = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user.id,
  }).populate('items.plantId');

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Order not found or does not belong to you',
    });
  }

  res.status(200).json({
    status: 'success',
    order,
  });
});
