const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.post('/addtocart', authController.protect, cartController.addToCart);
router.patch('/updatecart', authController.protect, cartController.updateCart);
router.delete(
  '/deleteitem/:plantId',
  authController.protect,
  cartController.deleteCartItem
);
router.get('/cart', authController.protect, cartController.getCart);
router.delete('/clear-cart', authController.protect, cartController.clearCart);
router.get(
  '/check-availability',
  authController.protect,
  cartController.checkCartAvailability
);
router.get('/cart/total', authController.protect, cartController.getCartTotal);

router.route('/').get(userController.getAllUsers);
// .post(console.log('hello'));

// router
//   .route('/:id')
//   .get(console.log('hello'))
//   .patch(console.log('hello'))
//   .delete(console.log('hello'));

module.exports = router;
