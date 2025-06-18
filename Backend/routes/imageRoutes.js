const express = require('express');
const router = express.Router();
const { getGfs } = require('../utils/gridfs'); // Adjust path if needed

router.get('/:filename', async (req, res) => {
  const gfs = getGfs(); // ✅ use getter
  if (!gfs) {
    return res.status(500).json({ message: 'gfs not initialized yet' });
  }

  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file || !file.contentType.startsWith('image')) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving image' });
  }
});

module.exports = router;
