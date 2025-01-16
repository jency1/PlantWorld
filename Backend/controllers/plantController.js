const Plant = require('./../model/plantModel');

exports.getAllPlants = (req, res) => {
  res.send('hello');
};

exports.createPlant = async (req, res) => {
  try {
    const newTour = await Plant.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.getPlant = (req, res) => {
  res.send('hello');
};

exports.updatePlant = (req, res) => {
  res.send('hello');
};
exports.deletePlant = (req, res) => {
  res.send('hello');
};
