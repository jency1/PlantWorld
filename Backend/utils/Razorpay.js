const Razorpay = require('razorpay');
console.log('Razorpay:', Razorpay);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
  //   headers: {
  //     'X-Razorpay-Account': '<merchant_account_id>',
  //   },
});

// instance.orders.all().then(console.log).catch(console.error);

module.exports = instance;
