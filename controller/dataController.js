const pool = require('../config/db');
const {schemaName,rank_table} = require('../config/config')

async function getAssessmentWiseReport(assessment_id,user_id) {
  try {
    const result = await pool.query(`SELECT * FROM ${schemaName}.${rank_table} where assessment_id::text = $1 AND user_id = $2`,[assessment_id,user_id]);
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getOverallProgress(user_id) {
    try {
      const result = await pool.query(`SELECT * FROM ${schemaName}.${rank_table} where user_id = $1`,[user_id]);
      return result.rows;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }
module.exports = {
    getAssessmentWiseReport,
    getOverallProgress,
};
