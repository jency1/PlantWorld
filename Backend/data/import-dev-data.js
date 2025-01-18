const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Plant = require('./../model/plantModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log('DB connection successfull!!');
  });

//   read json file
const plants = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/plants-simple.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Plant.create(plants);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all the data from collection

const deleteData = async () => {
  try {
    await Plant.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
console.log(process.argv);
