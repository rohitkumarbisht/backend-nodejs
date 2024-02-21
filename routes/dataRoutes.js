const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getAssessmentWiseReport, getOverallProgress, getTeacherView } = require('../controller/dataController');
const { jwt_secret_key, jwt_audience, jwt_issuer } = require('../config/config.js');
const { CustomUnauthorizedError, CustomNotFoundError, CustomInternalServerError } = require('./error-handling/custom_error.js');

router.get('/analytics-report/assessment-wise', async (req, res) => {
  try {
    const assessment_id = req.query.assessment_id;
    const user_id = extractUserIdFromToken(req.headers.authorization);
    const data = await getAssessmentWiseReport(assessment_id, user_id);
    res.json(data);
  } catch (err) {
    if (err instanceof CustomUnauthorizedError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof CustomNotFoundError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof CustomInternalServerError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(200).json({ error: err })
    }
  }
});

router.get('/analytics-report/overall-progress', async (req, res) => {
  try {
    const user_id = extractUserIdFromToken(req.headers.authorization);
    const data = await getOverallProgress(user_id);
    res.json(data);
  } catch (err) {
    if (err instanceof CustomUnauthorizedError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof CustomNotFoundError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof CustomInternalServerError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(200).json({ error: err })
    }
  }
});

router.get('/analytics-report/teacher-view', async (req, res) => {
  try {
    extractRoleFromToken(req.headers.authorization)
    const data = await getTeacherView();
    res.json(data);
  } catch (err) {
    if (err instanceof CustomUnauthorizedError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof CustomNotFoundError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof CustomInternalServerError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(200).json({ error: err })
    }
  }
});

function extractRoleFromToken(authorizationHeader){
  const options = {
    algorithms: ['HS256'],
    ignoreExpiration: true,
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
    if(decodedToken.roles=='ROLE_ADMIN' || decodedToken.roles=='ROLE_TEACHER'){
      role = decodedToken.roles;}
    else{
      throw new err;
    }
  } catch (err) {
    throw new CustomUnauthorizedError(`Unauthorized: User not having permision `);
  }
  return role;
}

function extractUserIdFromToken(authorizationHeader) {
  const options = {
    algorithms: ['HS256'],
    ignoreExpiration: true,
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

module.exports = router;