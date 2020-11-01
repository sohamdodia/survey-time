const jwt = require('jsonwebtoken');
const config = require('../config');
const message = require('../message');


// Generate error message
const getErrorMessage = (error = {}, message = 'Something went wrong.') => {
  const result = {};

  result.status = false;
  result.message = message;
  result.data = null;
  result.error = error;

  return result;
};

// Generate success message
const getSuccessMessage = (data = {}, message = 'Request completed successfully.') => {
  const result = {};

  result.status = true;
  result.message = message;
  result.data = data;
  result.error = null;

  return result;
};

//Generate JWT token
const generateToken = (value) => jwt.sign({ username: value }, config.const.token.secret, { expiresIn: config.const.token.expiryTime });


//Validate JWT token
const validateAuthorization = async (req, res, next) => {
  try {
    if (req.headers.hasOwnProperty('authorization')) {
      const parts = req.headers.authorization.split(' ');
      const [, token] = parts;
      if (token) { //decode token if token found
        jwt.verify(token, config.const.token.secret, async (err, decoded) => { //verifies token and checks exp
          if (err) {
            return res.status(401).json(getErrorMessage({}, message.userUnauthorized));
          }
          req.username = decoded.username;
          next();
        });
      } else { // if there is no token return error
        return res.status(401).json(getErrorMessage({}, message.userUnauthorized));
      }
    } else {
      return res.status(401).json(getErrorMessage({}, message.userUnauthorized));
    }
  } catch (error) {
    return res.status(401).json(getErrorMessage({}, message.userUnauthorized));
  }
};

//Create full URL from request
const getFullUrl = (req) => `${req.protocol}://${req.headers.host}`;


module.exports = {
  getErrorMessage,
  getSuccessMessage,
  generateToken,
  validateAuthorization,
  getFullUrl
}