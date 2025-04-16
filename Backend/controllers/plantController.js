const AppError = require('../utils/appError');
const Plant = require('./../model/plantModel');
const APIFeatures = require('./../utils/ApiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.aliasFeaturedProducts = (req, res, next) => {
  req.query.limit = '8';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,imageCover';
  next();
};

exports.getAllPlants = catchAsync(async (req, res, next) => {
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
});

exports.createPlant = catchAsync(async (req, res, next) => {
  const newTour = await Plant.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getPlant = catchAsync(async (req, res, next) => {
  const plant = await Plant.findById(req.params.id);
  // Plant.findOne({_id:req.params.id})

  if (!plant) {
    next(new AppError('No plant found with that ID', 404));
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      plant,
    },
  });
});

exports.updatePlant = catchAsync(async (req, res, next) => {
  const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!plant) {
    next(new AppError('No plant found with that ID', 404));
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      plant,
    },
  });
});

exports.deletePlant = catchAsync(async (req, res, next) => {
  const plant = await Plant.findByIdAndDelete(req.params.id);

  if (!plant) {
    next(new AppError('No plant found with that ID', 404));
    return;
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getPlantStats = catchAsync(async (req, res, next) => {
  const stats = await Plant.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$category' },
        numPlants: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'HERBS' } },
    // },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getTotalPlants = catchAsync(async (req, res, next) => {
  const totalPlants = await Plant.countDocuments();
  console.log(totalPlants);

  res.status(200).json({
    status: 'success',
    totalPlants, // 👈 clearer and more meaningful than `results`
    data: null,
  });
});
