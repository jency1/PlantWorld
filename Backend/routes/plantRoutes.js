const express = require('express');
const router = express.Router();
const plantController = require('./../controllers/plantController');

router.param('id', (req, res, next, val) => {
  consolelog(`tour id is ${id}`);
  next();
});

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
