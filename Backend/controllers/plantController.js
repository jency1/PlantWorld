const Plant = require('./../model/plantModel');
const APIFeatures = require('./../utils/ApiFeatures');

exports.aliasFeaturedProducts = (req, res, next) => {
  req.query.limit = '8';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,imageCover';
  next();
};

exports.getAllPlants = async (req, res) => {
  try {
    const features = new APIFeatures(Plant.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const plants = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: plants.length,
      data: {
        plants,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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

exports.getPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    // Plant.findOne({_id:req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        plant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        plant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
