
function calculateAverageReport(result) {
    const report_data = {
        "total_assessments": result.data.assessment_count,
        "total_questions": result.data.total_questions,
        "total_test_time": result.data.total_test_time,
        "average_test_time": result.data.average_test_time,
        "total_correct_questions" : result.data.correct_number_of_questions,
        "total_incorrect_questions" : result.data.incorrect_number_of_questions,
        "tota_time_spent_on_correct":result.data.time_spent_on_correct,
        "tota_time_spent_on_incorrect":result.data.time_spent_on_incorrect,
        "total_correct_percentage" : result.data.correct_percentage,
        "total_incorrect_percentage" :result.data.incorrect_percentage,
        "assessment_comparison" : result.assessment_list,
        "assessment_status" : result.assessment_status
    }

    return report_data;
}

function calculateIndividualReport(result){
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

module.exports = {
    calculateAverageReport,
    calculateIndividualReport
};