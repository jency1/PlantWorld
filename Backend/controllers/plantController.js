const { Tour } = require('@mui/icons-material');
const Plant = require('./../model/plantModel');

exports.getAllPlants = async (req, res) => {
  try {
    console.log(req.query);

    // BUILD QUERY
    // 1)filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    // 2)Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    console.log(JSON.parse(queryString));
    // mongoose {tag:'Indoor' , price:{$gte:200}}
    // req.query { tag: 'Indoor', price: { gte: '200' } }

    const query = Plant.find(JSON.parse(queryString));

    // EXECUTE QUERY

    const plants = await query;

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
