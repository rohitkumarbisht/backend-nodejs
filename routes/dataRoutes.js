const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {getAssessmentWiseReport,getOverallProgress} = require('../controller/dataController');
const {jwt_secret_key} = require('../config/config.js');

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
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

function extractUserIdFromToken(authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    const base64Key = Buffer.from(jwt_secret_key).toString('base64');
    const decodedToken = jwt.verify( token, base64Key);
    const user_id = decodedToken.jti;
    return user_id;
  }
  

module.exports = router;
