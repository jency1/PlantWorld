const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

// No auth middleware now — open for all users
router.post('/', contactController.submitContactForm);

module.exports = router;
