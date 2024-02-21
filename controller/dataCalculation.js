
function calculateAverageReport(result) {
    const report_data = {
        "total_assessments": result.data.assessment_count,
        "total_questions": result.data.total_questions,
        "total_test_time": result.data.total_test_time,
        "average_test_time": result.data.average_test_time,
        "total_correct_questions": result.data.correct_number_of_questions,
        "total_incorrect_questions": result.data.incorrect_number_of_questions,
        "total_time_spent_on_correct": result.data.time_spent_on_correct,
        "total_time_spent_on_incorrect": result.data.time_spent_on_incorrect,
        "total_correct_percentage": result.data.correct_percentage,
        "total_incorrect_percentage": result.data.incorrect_percentage,
        "assessment_comparison": result.assessment_list,
        "assessment_status": result.assessment_status
    }

    return report_data;
}

function calculateIndividualReport(result) {
    const individual_data = {
        "score": result.head_data.score,
        "rank": result.head_data.rank,
        "percentage": result.head_data.percentage,
        "percentile": result.head_data.percentile,
        "test_time": result.head_data.test_time,
        "table_graph_data": result.table_graph_data,
        "leaderboard": result.leaderboard
    }
    return individual_data;
}

function calculateTeacherReport(result) {

    const transformedData = {
        "assessment_rank": []
      };
      
      const rank_data = { "assessment_rank": result.assessment_rank }
      
      rank_data.assessment_rank.forEach(entry => {
        const assessmentId = entry.assessment_id
        const assessmentName = entry.assessment_name
      
        let existingEntry = transformedData.assessment_rank.find(e => e.assessment_id === assessmentId)
      
        if (!existingEntry) {
          existingEntry = {
            assessment_id: assessmentId,
            assessment_name: assessmentName,
            leaderboard: []
          };
          transformedData.assessment_rank.push(existingEntry)
        }
      
        existingEntry.leaderboard.push({
          assessment_name: entry.assessment_name,
          rank: entry.rank,
          name: entry.name,
          percentage: entry.percentage,
          skill: entry.skill,
          total_test_time: entry.test_time
        })
      })
    

    const teacher_view = {
        "total_students": result.data.total_students,
        "assessment_attempted": result.data.assessment_attempted,
        "overall_percentage": result.data.overall_percentage,
        "completed_assessments": result.data.completed_assessments,
        "in_progress_assessments": result.data.in_progress_assessments,
        "total_correct_percentage": result.data.correct_percentage,
        "total_incorrect_percentage": result.data.incorrect_percentage,
        "total_correct_questions": result.data.correct_questions,
        "total_incorrect_questions": result.data.incorrect_questions,
        "total_time_spent_on_correct": result.data.time_spent_on_correct,
        "total_time_spent_on_incorrect": result.data.time_spent_on_correct,
        "assessment_percentage": result.assessment_list,
        "assessment_rank": transformedData.assessment_rank

    }
    return teacher_view;
}

module.exports = {
    calculateAverageReport,
    calculateIndividualReport,
    calculateTeacherReport
};