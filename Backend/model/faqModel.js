const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'FAQ must have a question'],
  },
  answer: {
    type: String,
    required: [true, 'FAQ must have an answer'],
  },
  image: {
    type: String,
    default: '',
  },
});

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
