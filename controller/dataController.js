const pool = require('../config/db');
const { overall_data_query, assessment_list_query, assessment_status_query } = require('../query/overall_progress.js');
const { calculateAverageReport, calculateIndividualReport, calculateTeacherReport } = require('./dataCalculation');
const { head_reports_individual_query, table_view_summary_query, leaderboard_query } = require('../query/individual_assessment_report.js');
const { CustomNotFoundError } = require('../routes/error-handling/custom_error.js');
const { head_reports_teacher_query, assessment_percentage_teacher_query, leaderboard_teacher_query } = require('../query/teachers_report.js');

async function getAssessmentWiseReport(assessment_id, user_id) {
  try {
    const head_reports_individual = await pool.query(head_reports_individual_query, [assessment_id, user_id]);

    const table_view_summary = await pool.query(table_view_summary_query, [assessment_id, user_id]);

    const leaderboard_data = await pool.query(leaderboard_query, [assessment_id]);

    const final = {
      head_data: head_reports_individual.rows[0],
      table_graph_data: table_view_summary.rows,
      leaderboard: leaderboard_data.rows
    }
    if ( table_view_summary.rows.length === 0 || leaderboard_data.rows.length == 0) {
      throw new CustomNotFoundError(`No data found for assessment ID: ${assessment_id}`);
    }else{
      const result = calculateIndividualReport(final)
      return result;
    }
   
  } catch (error) {
    throw new CustomNotFoundError(` ${error.message}`);
  }
}

async function getOverallProgress(user_id) {
  try {
    const overall_data = await pool.query(overall_data_query, [user_id]);

    const assessment_list = await pool.query(assessment_list_query, [user_id]);

    const assessment_status = await pool.query(assessment_status_query, [user_id])

    const final = {
      data: overall_data.rows[0],
      assessment_list: assessment_list.rows,
      assessment_status: assessment_status.rows
    }
    if (overall_data.rows[0].percentage == null || assessment_list.rows.length === 0 || assessment_status.rows.length == 0) {
      throw new CustomNotFoundError(`No data found for user ID: ${user_id}`);
    }else{
      const result = calculateAverageReport(final)
      return result;
    }
  } catch (error) {
    throw new CustomNotFoundError(` ${error.message}`);
  }
}

async function getTeacherView() {
  try {
    const overall_data = await pool.query(head_reports_teacher_query);

    const assessment_list = await pool.query(assessment_percentage_teacher_query);

    const assessment_rank = await pool.query(leaderboard_teacher_query)

    const final = {
      data: overall_data.rows[0],
      assessment_list: assessment_list.rows,
      assessment_rank: assessment_rank.rows
    }
    if (assessment_list.rows.length === 0 || assessment_rank.rows.length == 0) {
      throw new CustomNotFoundError(`No data found`);
    }else{
      const result = calculateTeacherReport(final)
      return result;
    }
  } catch (error) {
    throw new CustomNotFoundError(` ${error.message}`);
  }
}

module.exports = {
  getAssessmentWiseReport,
  getOverallProgress,
  getTeacherView
};
