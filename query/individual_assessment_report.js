const {schemaName,rank_table, statement_table, statement_view_table, average_table} = require('../config/config.js');

const individual_report_query = `
SELECT * FROM ${schemaName}.${rank_table} where assessment_id::text = $1 AND user_id = $2`

module.exports = {
    individual_report_query
}