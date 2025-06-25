const express = require('express');
const faqController = require('../controllers/faqController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(faqController.getAllFAQs)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'owner'),
    faqController.createFAQ
  );

router
  .route('/:id')
  .get(faqController.getFAQ)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'owner'),
    faqController.updateFAQ
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'owner'),
    faqController.deleteFAQ
  );

module.exports = router;
