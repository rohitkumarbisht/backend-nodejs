const express = require('express');
const router = express.Router();
const { getAssessmentWiseReport, getOverallProgress, getTeacherView } = require('../controller/dataController');
const { ANALYTICS_REPORT, TEACHER_VIEW, OVERALL_PROGRESS, ASSESSMENT_WISE } = require('../config/config.js');
const { CustomUnauthorizedError, CustomNotFoundError, CustomInternalServerError } = require('./error-handling/custom_error.js');
const extractRoleFromToken  = require('../utils/extract_role.js');
const extractUserIdFromToken = require('../utils/extract_user_id.js');

router.get(`${ANALYTICS_REPORT}${ASSESSMENT_WISE}`, async (req, res) => {
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

router.get(`${ANALYTICS_REPORT}${OVERALL_PROGRESS}`, async (req, res) => {
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
    }
  }
});

router.get(`${ANALYTICS_REPORT}${TEACHER_VIEW}`, async (req, res) => {
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
      console.log(err);
      res.status(200).json({ error: err })
    }
  }
});

module.exports = router;