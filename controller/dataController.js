const pool = require('../config/db');
const {overall_data_query, assessment_list_query, assessment_status_query} = require('../query/overall_progress.js');
const { calculateAverageReport } = require('./dataCalculation');
const { individual_report_query } = require('../query/individual_assessment_report.js');

async function getAssessmentWiseReport(assessment_id,user_id) {
  try {
    const result = await pool.query(individual_report_query,[assessment_id,user_id]);
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getOverallProgress(user_id) {
    try {
      const overall_data = await pool.query( overall_data_query, [user_id]);
        
      const assessment_list = await pool.query(assessment_list_query, [user_id]);

      const assessment_status = await pool.query(assessment_status_query,[user_id])

      const final = {
        data : overall_data.rows[0],
        assessment_list: assessment_list.rows,
        assessment_status : assessment_status.rows
      }

      const result = calculateAverageReport(final)
      return result;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }
module.exports = {
    getAssessmentWiseReport,
    getOverallProgress,
};
