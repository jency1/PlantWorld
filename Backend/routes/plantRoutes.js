const express = require('express');
const router = express.Router();
const plantController = require('./../controllers/plantController');

const authController = require('./../controllers/authController');

// router.param('id', plantController.checkID);

router
  .route('/featured-products')
  .get(plantController.aliasFeaturedProducts, plantController.getAllPlants);

router.route('/plant-stats').get(plantController.getPlantStats);

// router
//   .route('/')
//   .get(authController.protect, plantController.getAllPlants)
//   .post(plantController.createPlant);

router
  .route('/')
  .get(plantController.getAllPlants)
  .post(plantController.createPlant);

router
  .route('/:id')
  .get(plantController.getPlant)
  .patch(plantController.updatePlant)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'owner'),
    plantController.deletePlant
  );

module.exports = router;
