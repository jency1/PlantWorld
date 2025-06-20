const catchAsync = require('../utils/catchAsync');
const instance = require('./../utils/Razorpay');
const { validatePaymentVerification } = require('razorpay');

const crypto = require('crypto');

function validateSignature(order_id, payment_id, signature, secret) {
  const body = `${order_id}|${payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
}

exports.checkout = catchAsync(async (req, res) => {
  const options = {
    amount: Number(req.body.amount), // ✅ already in paise
    currency: 'INR',
  };

  const order = await instance.orders.create(options);

  console.log(order);
  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.paymentVerification = (req, res) => {
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Validate required fields
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing required payment fields',
    });
  }

  try {
    const isAuthentic = validateSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      process.env.RAZORPAY_API_SECRET
    );

    console.log('Payment verification result:', isAuthentic);

    if (!isAuthentic) {
      return res.status(400).json({
        status: 'fail',
        message: 'Payment verification failed',
      });
    }

    //  res.redirect('') give frontened link . where you want to redirect after successful verification

    // eg res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)

    res.status(200).json({
      status: 'success',
      message: 'Payment verified successfully',
    });
  } catch (err) {
    console.error('Error during payment verification:', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
