const ContactUs = require('../model/contactUsModel');
const sendEmail = require('../utils/email');
const catchAsync = require('../utils/catchAsync');

exports.submitContactForm = catchAsync(async (req, res, next) => {
  const { name, email, contactNumber, message } = req.body;

  if (!name || !email || !contactNumber || !message) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Please fill all required fields: name, email, contactNumber, message',
    });
  }

  // 1. Save the contact entry
  const newEntry = await ContactUs.create({
    name,
    email,
    contactNumber,
    message,
  });

  // 2. Send confirmation email to the user
  const emailMessage = `
Hi ${name},

Thank you for reaching out to us at PlantWorld 🌿

We’ve received your message and our team is currently reviewing it. We truly value your feedback and will get back to you as soon as possible!

Here’s a copy of your message for reference:
-----------------------
${message}
-----------------------

In the meantime, feel free to continue exploring our collection of beautiful plants and gardening tools.

With green regards,  
The PlantWorld Team 🌱
`;

  await sendEmail({
    email,
    subject: '🌿 Your message has been received by PlantWorld!',
    message: emailMessage,
  });

  res.status(200).json({
    status: 'success',
    message:
      'Your message was submitted successfully. A confirmation email has been sent.',
    data: {
      contact: newEntry,
    },
  });
});
