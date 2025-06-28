const AppError = require('../utils/appError');
const Plant = require('./../model/plantModel');
const APIFeatures = require('./../utils/ApiFeatures');
const catchAsync = require('./../utils/catchAsync');
const path = require('path');
const fs = require('fs');

exports.aliasFeaturedProducts = (req, res, next) => {
  req.query.limit = '8';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,imageCover';
  next();
};

exports.getAllPlants = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Plant.find(), req.query)
    .search()
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

// exports.createPlant = catchAsync(async (req, res, next) => {
//   const newTour = await Plant.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       tour: newTour,
//     },
//   });
// });

exports.createPlant = async (req, res, next) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ message: 'Image file (imageCover) is required' });
    }

    const host = req.get('host'); // e.g. localhost:8000
    const protocol = req.protocol; // e.g. http

    const imageUrl = `${protocol}://${host}/images/${imageFile.filename}`;

    // Parse plantCareTips if sent as JSON string
    if (req.body.plantCareTips && typeof req.body.plantCareTips === 'string') {
      try {
        req.body.plantCareTips = JSON.parse(req.body.plantCareTips);
      } catch (err) {
        return next(new AppError('Invalid plantCareTips format', 400));
      }
    }

    const newPlantData = {
      ...req.body,
      plantCareTips: req.body.plantCareTips,
      imageCover: imageUrl, // ✅ store full access link
    };

    const newPlant = await Plant.create(newPlantData);

    res.status(201).json({
      status: 'success',
      data: {
        plant: newPlant,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

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

// exports.updatePlant = catchAsync(async (req, res, next) => {
//   const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!plant) {
//     next(new AppError('No plant found with that ID', 404));
//     return;
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       plant,
//     },
//   });
// });

// exports.updatePlant = catchAsync(async (req, res, next) => {
//   // If a new image is uploaded, update imageCover
//   if (req.file) {
//     const host = req.get('host');
//     const protocol = req.protocol;
//     const imageUrl = `${protocol}://${host}/images/${req.file.filename}`;
//     req.body.imageCover = imageUrl;
//   }

//   const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!updatedPlant) {
//     return next(new AppError('No plant found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       plant: updatedPlant,
//     },
//   });
// });

exports.updatePlant = async (req, res, next) => {
  try {
    // Fetch plant by ID
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return next(new AppError('No plant found with that ID', 404));
    }

    // If a new image is uploaded, update imageCover
    if (req.file) {
      // Delete old image file
      if (plant.imageCover) {
        const imagePath = path.join(
          __dirname,
          '..',
          'public',
          'images',
          path.basename(plant.imageCover)
        );
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) console.error('Error deleting old image:', err);
          });
        }
      }

      const host = req.get('host');
      const protocol = req.protocol;
      const imageUrl = `${protocol}://${host}/images/${req.file.filename}`;
      req.body.imageCover = imageUrl;
    }

    // Parse plantCareTips if it's a JSON string
    if (req.body.plantCareTips && typeof req.body.plantCareTips === 'string') {
      try {
        req.body.plantCareTips = JSON.parse(req.body.plantCareTips);
      } catch (err) {
        return next(new AppError('Invalid plantCareTips format', 400));
      }
    }

    // Set availability based on updated quantity (if quantity is being updated)
    if (req.body.quantity !== undefined) {
      if (req.body.quantity === 0) {
        req.body.availability = 'Out Of Stock';
      } else if (plant.availability === 'Out Of Stock') {
        req.body.availability = 'In Stock';
      }
    }

    // Apply update
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        plant: updatedPlant,
      },
    });
  } catch (err) {
    console.error('Update error:', err);
    return next(new AppError(err.message || 'Error updating plant', 500));
  }
};

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

exports.getPlantsByAvailability = catchAsync(async (req, res, next) => {
  // Normalize: 'in-stock' -> 'In Stock'
  const availabilityParam = req.params.availability;

  const normalizedAvailability = availabilityParam
    .split('-') // ['in', 'stock']
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // ['In', 'Stock']
    .join(' '); // 'In Stock'

  console.log('Normalized availability:', normalizedAvailability);

  const plants = await Plant.find({ availability: normalizedAvailability });

  res.status(200).json({
    status: 'success',
    results: plants.length,
    data: {
      plants,
    },
  });
});
