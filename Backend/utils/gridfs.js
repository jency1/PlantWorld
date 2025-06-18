const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

// Use a new connection for GridFS
const conn = mongoose.createConnection(
  process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // The collection name used by GridFS
});

const storage = new GridFsStorage({
  url: process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  ),
  file: (req, file) => {
    // Sanitize original file name by replacing all whitespace with underscores
    const safeOriginalName = file.originalname.replace(/\s+/g, '_');

    return {
      filename: `plant_${Date.now()}_${safeOriginalName}`,
      bucketName: 'uploads',
    };
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
  getGfs: () => gfs, // ✅ Export a getter so we can safely access gfs later
};
