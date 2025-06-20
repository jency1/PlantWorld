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
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; line-height: 1.6;">
    <p>Hi <strong>${name}</strong>,</p>

    <p>Thank you for reaching out to us at <span style="color: green; font-weight: bold;">PlantWorld 🌿</span>.</p>

    <p>We’ve received your message and our team is currently reviewing it. We truly value your feedback and will get back to you as soon as possible!</p>

    <p><strong">Here’s a copy of your message for reference:</strong></p>
    <p style="margin-left: 15px; font-style: italic;">
      <hr />
      ${message}
      <hr />
    </p>

    <p>In the meantime, feel free to continue exploring our collection of beautiful plants and gardening tools.</p>

    <p>With green regards,<br />
    <strong><span style="color: green;">The PlantWorld Team 🌱</span></strong></p>
  </div>
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
