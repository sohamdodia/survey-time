require('dotenv').config();

const jwtSecret = 'E=MC2';

exports.const = {
  apiPort: process.env.PORT || 6005,
  token: {
    secret: jwtSecret,
    expiryTime: 36 * 36 * 720
  }
};