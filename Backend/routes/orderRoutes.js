const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.protect, orderController.createOrder);

router.get('/myorders', authController.protect, orderController.getMyOrders);

router.patch(
  '/:orderId/status',
  authController.protect,
  authController.restrictTo('admin', 'owner'),
  orderController.updateOrderStatus
);

module.exports = router;
