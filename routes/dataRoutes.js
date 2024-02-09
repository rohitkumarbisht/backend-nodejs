const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {getAssessmentWiseReport,getOverallProgress} = require('../controller/dataController');
const {jwt_secret_key,jwt_audience,jwt_issuer} = require('../config/config.js');

router.get('/analytics-report/assessment-wise', async (req, res) => {
  try {
    const assessment_id = req.query.assessment_id;
    const user_id = extractUserIdFromToken(req.headers.authorization);
    const data = await getAssessmentWiseReport(assessment_id,user_id);
    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/analytics-report/overall-progress', async (req, res) => {
    try {
      const user_id = extractUserIdFromToken(req.headers.authorization);
      const data = await getOverallProgress(user_id);
      res.json(data);
    } catch (error) {
      console.error('Error executing query', error);
      res.json(error);
    }
  });
  

function extractUserIdFromToken(authorizationHeader) {
    const options = {
      algorithms: ['HS256'],
      ignoreExpiration: true,
      issuer: jwt_issuer,
      audience: jwt_audience
    };
    let user_id = ''
    const token = authorizationHeader.split(' ')[1];
    const base64Key = Buffer.from(jwt_secret_key).toString('base64');
    try {
      const decodedToken = jwt.verify(token, base64Key,options);
      user_id = decodedToken.jti;
  
  } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ error: 'Unauthorized' });
  }
    return user_id;
  }
  

module.exports = router;
