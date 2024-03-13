
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
exports.sendOTP = async (req, res) => {
  const userId = req.params.userId;

  try {
    
    const otp = '123456'; 

  
    const order = new Order({ userId, otp });
    await order.save();

 
    const user = await User.findById(userId);
    const email = user.email;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com', 
        pass: 'your_email_password' 
      }
    });

   
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Order OTP Verification',
      text: `Your OTP for order verification is: ${otp}`
    };

  
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

  cron.schedule('*/20 * * * *', async () => {
    try {
      
      await Order.updateMany({ status: 'pending', otp: { $exists: false } }, { status: 'canceled' });
      console.log('Canceled orders without OTP confirmation');
    } catch (error) {
      console.error('Error canceling orders:', error);
    }
  });
};




