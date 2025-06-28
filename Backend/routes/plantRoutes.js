const express = require('express');
const router = express.Router();
const plantController = require('./../controllers/plantController');

const authController = require('./../controllers/authController');
const { upload } = require('../utils/gridfs');

// router.param('id', plantController.checkID);

router
  .route('/featured-products')
  .get(plantController.aliasFeaturedProducts, plantController.getAllPlants);

router.route('/plant-stats').get(plantController.getPlantStats);
router.route('/plantTotal').get(plantController.getTotalPlants);

router.get(
  '/availability/:availability',
  plantController.getPlantsByAvailability
);

// router
//   .route('/')
//   .get(authController.protect, plantController.getAllPlants)
//   .post(plantController.createPlant);

router
  .route('/')
  .get(plantController.getAllPlants)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'owner'),
    upload.single('imageCover'),
    plantController.createPlant
  );

router
  .route('/:id')
  .get(plantController.getPlant)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'owner'),
    upload.single('imageCover'),
    plantController.updatePlant
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'owner'),
    plantController.deletePlant
  );

module.exports = router;
