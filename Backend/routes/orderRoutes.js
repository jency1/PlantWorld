const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.protect, orderController.createOrder);
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin', 'owner', 'deliverypartner'),
  orderController.getAllOrders
);
router.get('/myorders', authController.protect, orderController.getMyOrders);

router.get(
  '/myorders/:orderId',
  authController.protect,
  orderController.getMyOrderById
);

router.patch(
  '/:orderId/status',
  authController.protect,
  authController.restrictTo('admin', 'owner', 'deliverypartner'),
  orderController.updateOrderStatus
);

router.patch(
  '/:orderId/cancel',
  authController.protect,
  orderController.cancelOrder
);

router.get(
  '/:orderId',
  authController.protect,
  authController.restrictTo('admin', 'owner', 'deliverypartner'),
  orderController.getOrderById
);
module.exports = router;
