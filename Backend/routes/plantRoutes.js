const express = require('express');
const router = express.Router();
const plantController = require('./../controllers/plantController');

// router.param('id', plantController.checkID);

router
  .route('/featured-products')
  .get(plantController.aliasFeaturedProducts, plantController.getAllPlants);

router.route('/plant-stats').get(plantController.getPlantStats);

router
  .route('/')
  .get(plantController.getAllPlants)
  .post(plantController.createPlant);

router
  .route('/:id')
  .get(plantController.getPlant)
  .patch(plantController.updatePlant)
  .delete(plantController.deletePlant);

module.exports = router;
