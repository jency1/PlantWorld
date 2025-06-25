const FAQ = require('../model/faqModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllFAQs = catchAsync(async (req, res) => {
  const faqs = await FAQ.find();
  res.status(200).json({
    status: 'success',
    results: faqs.length,
    data: { faqs },
  });
});

exports.getFAQ = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) return next(new AppError('FAQ not found', 404));
  res.status(200).json({ status: 'success', data: { faq } });
});

exports.createFAQ = catchAsync(async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({ status: 'success', data: { faq } });
});

exports.updateFAQ = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!faq) return next(new AppError('FAQ not found', 404));
  res.status(200).json({ status: 'success', data: { faq } });
});

exports.deleteFAQ = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) return next(new AppError('FAQ not found', 404));
  res.status(204).json({ status: 'success', data: null });
});
