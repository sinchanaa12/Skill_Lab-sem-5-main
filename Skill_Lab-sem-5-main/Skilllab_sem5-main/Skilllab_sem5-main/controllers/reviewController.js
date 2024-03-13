

const axios = require('axios');
const FB_ACCESS_TOKEN = 'your_facebook_access_token';

exports.shareReviewOnFacebook = async (req, res) => {
  const { review } = req.body;

  try {
    
    const response = await axios.post(`https://graph.facebook.com/me/feed?access_token=${FB_ACCESS_TOKEN}`, {
      message: review,
    });

    console.log('Review shared on Facebook:', response.data);
    res.status(200).json({ message: 'Review shared on Facebook' });
  } catch (error) {
    console.error('Error sharing review on Facebook:', error.response.data);
    res.status(500).json({ message: 'Error sharing review on Facebook' });
  }
};

