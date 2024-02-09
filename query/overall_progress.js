const {schemaName, statement_table, statement_view_table, average_table} = require('../config/config.js');

const overall_data_query = `
    SELECT

        --*Count of Assessments*
        COUNT(DISTINCT st.assessment_id) AS assessment_COUNT,

        --*Count of number of questions*
        (select COUNT(*) 
            from 
            ${schemaName}.${statement_view_table} 
            where 
            event_type = 'Assessment Item' and user_id = $1) 
            AS total_questions,

        --*Total Percentage*
        (select 
            ROUND((SUM(given_score)::numeric / SUM(max_score)::numeric)*100, 2) 
            AS percentage 
            from 
            ${schemaName}.${statement_view_table} 
            where 
            event_type = 'Assessment' and user_id = $1),
        
        --*Average Time*
        (select 
            to_char(EXTRACT(HOUR FROM avg(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(MINUTE FROM avg(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(SECOND FROM avg(test_time)), 'fm00') 
            as average_test_time 
            from 
            ${schemaName}.${statement_view_table} 
            where 
            event_type = 'Assessment' and user_id = $1),

            --*Total Time*
            (select 
            to_char(EXTRACT(HOUR FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(MINUTE FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(SECOND FROM sum(test_time)), 'fm00') 
            as total_test_time 
            from 
                ${schemaName}.${statement_view_table} 
            where 
                event_type = 'Assessment' and user_id = $1),

            --*Number of correct questions*
            (select 
            count(*) 
            AS correct_number_of_questions 
            from 
                ${schemaName}.${statement_view_table} 
            where 
                event_type = 'Assessment Item' and result IN (TRUE) and user_id = $1),
            
            --*Number of incorrect questions*
            (select 
            count(*) 
            AS incorrect_number_of_questions 
            from 
                ${schemaName}.${statement_view_table} 
            where 
                event_type = 'Assessment Item' and result IN (FALSE) and user_id = $1),

            --*Time of correct questions*
            (select 
            to_char(EXTRACT(HOUR FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(MINUTE FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(SECOND FROM sum(test_time)), 'fm00') 
            as time_spent_on_correct 
            from 
                ${schemaName}.${statement_view_table} 
            where 
                event_type = 'Assessment Item' and result IN (TRUE) and user_id = $1),

            --*Time of incorrect questions*
            (select 
            to_char(EXTRACT(HOUR FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(MINUTE FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(SECOND FROM sum(test_time)), 'fm00') 
            as time_spent_on_incorrect 
            from 
                ${schemaName}.${statement_view_table} 
            where 
                event_type = 'Assessment Item' and result IN (FALSE) and user_id = $1),

            --*Percentage of correct questions*
            (select 
            ROUND((SUM(given_score)::numeric / SUM(max_score)::numeric)*100, 2) 
            AS correct_percentage 
            from 
                ${schemaName}.${statement_view_table} 
            where 
                event_type = 'Assessment' and user_id = $1),

            --*Percentage of incorrect questions*
            (select 
            100 - ROUND((SUM(given_score)::numeric / SUM(max_score)::numeric)*100, 2) 
            AS incorrect_percentage 
            from 
                ${schemaName}.${statement_view_table} 
            where 
                event_type = 'Assessment' and user_id = $1)
        FROM
            ${schemaName}.${statement_table} AS st
        WHERE
            st.user_id = $1;`





const assessment_list_query = `
    select

            --*Assessment id*
            sv.assessment_id 
                as assessment_id ,

            --*Assessment name*
            sv.assessment_txt 
                as assesment_name,
            
            --*Percentage*
            ROUND((sv.given_score::numeric / sv.max_score::numeric)*100, 2) 
                AS percentage,

            --*Time*
            sv.test_minutes 
                as time_test,

            --*Average Percentage*
            ROUND((sva.average_score::numeric / sva.max_score::numeric)*100, 2) 
                AS average_percentage,

            --*Average Time*
            ROUND(sva.average_time,2) 
                as average_time
        FROM 
            ${schemaName}.${statement_view_table} sv 
        join 
            ${schemaName}.${average_table} sva 
        on 
            sv.assessment_id = sva.assessment_id 
        WHERE 
            event_type = 'Assessment' AND given_score is not null AND user_id =$1`

const assessment_status_query = `
    select 
        assessment_id ,
        assessment_txt ,
        max(attempt_id) as attempt_count ,
        (case when max(last_update_dt) is null then 'In-Progress' else 'Completed' end) as status
        from 
            ${schemaName}.${statement_table} 
        where
            event_type = 'Assessment' and user_id=$1 
        group by
            assessment_id, assessment_txt`

module.exports = {
    overall_data_query,
    assessment_list_query,
    assessment_status_query
}