exports.checkID = (req, res, next, val) => {
  console.log('Hello from the param middleware');
  next();
};

exports.checkBody = (req, res, next) => {
  console.log('hello from the checkBody middleWare');
  next();
};

exports.getAllPlants = (req, res) => {
  res.send('hello');
};

exports.createPlant = (req, res) => {
  res.send('hello');
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
