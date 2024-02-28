const { admin_role, teacher_role, jwt_secret_key, jwt_audience, jwt_issuer } = require('../config/config.js');
const { CustomUnauthorizedError} = require('../routes/error-handling/custom_error.js');
const jwt = require('jsonwebtoken');

function extractRoleFromToken(authorizationHeader){
    const options = {
      algorithms: ['HS256'],
      ignoreExpiration: false,
      issuer: jwt_issuer,
      audience: jwt_audience
    };
  
    let role = ''
    let token = ''
  
    try {
      token = authorizationHeader.split(' ')[1];
    } catch (err) {
      throw new CustomUnauthorizedError(`Unauthorized: token not found `);
    }
    const base64Key = Buffer.from(jwt_secret_key).toString('base64');
    try {
      const decodedToken = jwt.verify(token, base64Key, options);
      if(decodedToken.roles==admin_role || decodedToken.roles==teacher_role){
        role = decodedToken.roles;}
      else{
        throw new err;
      }
    } catch (err) {
        console.log('error',err)
      throw new CustomUnauthorizedError(`Unauthorized: User not having permision `);
    }
    return role;
  }

module.exports = extractRoleFromToken;