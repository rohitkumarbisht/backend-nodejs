const { jwt_secret_key, jwt_audience, jwt_issuer } = require('../config/config.js');
const { CustomUnauthorizedError} = require('../routes/error-handling/custom_error.js');
const jwt = require('jsonwebtoken');

function extractUserIdFromToken(authorizationHeader) {
    const options = {
      algorithms: ['HS256'],
      ignoreExpiration: false,
      issuer: jwt_issuer,
      audience: jwt_audience
    };
    let user_id = ''
    let token = ''
    try {
      token = authorizationHeader.split(' ')[1];
    } catch (err) {
      throw new CustomUnauthorizedError(`Unauthorized: token not found `);
    }
    const base64Key = Buffer.from(jwt_secret_key).toString('base64');
    try {
      const decodedToken = jwt.verify(token, base64Key, options);
      user_id = decodedToken.jti;
  
    } catch (err) {
      throw new CustomUnauthorizedError(`Unauthorized: ${err} `);
    }
    return user_id;
  }

module.exports = extractUserIdFromToken;