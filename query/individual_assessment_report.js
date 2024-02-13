const {schemaName,rank_table, statement_table, statement_view_table, average_table} = require('../config/config.js');

const head_reports_individual_query = `
    SELECT 

        --*Score of Assessment* 
            rt.given_score as score,
            rt."rank" as rank,
        ROUND((rt.percentage:: NUMERIC * 100), 2) as percentage,
        ROUND((rt.percentile:: Numeric),2) as percentile,
        (select 
                to_char(EXTRACT(HOUR FROM (test_time)), 'fm00') || ':' ||
                to_char(EXTRACT(MINUTE FROM (test_time)), 'fm00') || ':' ||
                to_char(EXTRACT(SECOND FROM (test_time)), 'fm00') 
                )as test_time
        from 
            ${schemaName}.${rank_table} as rt
        where
            rt.assessment_id = $1
            and rt.user_id = $2;`

const table_view_summary_query = `
    select 
        s.attempt_id as attempt_count,
        TO_CHAR(DATE(s.submit_time),'dd-mm-yyyy') as submit_date,
        (select 
            count(*) 
        from 
            ${schemaName}.${statement_table} 
        where 
            "result" IN (TRUE) and attempt_id = s.attempt_id and user_id =$2 and event_type = 'Assessment Item'
            and assessment_id = $1) as correct_questions,
        (select 
            count(*) 
        from 
            ${schemaName}.${statement_table} 
        where 
            "result" IN (FALSE) and attempt_id = s.attempt_id and user_id =$2 and event_type = 'Assessment Item'
            and assessment_id = $1) as incorrect_questions,
        round(
            (select 
                count(*) 
            from 
                ${schemaName}.${statement_table} 
            where 
                "result" IN (TRUE) and attempt_id = s.attempt_id and user_id =$2 and event_type = 'Assessment Item'
                and assessment_id = $1):: NUMERIC * 100/(
            (select 
                count(*) 
            from 
                ${schemaName}.${statement_table} 
            where 
                "result" IN (FALSE) and attempt_id = s.attempt_id and user_id =$2 and event_type = 'Assessment Item'
                and assessment_id = $1) + 
            (select 
                count(*) 
            from 
                ${schemaName}.${statement_table} 
            where 
                "result" IN (true) and attempt_id = s.attempt_id and user_id =$2 and event_type = 'Assessment Item'
                and assessment_id = $1)):: NUMERIC,2) as percentage,
        (select 
            to_char(EXTRACT(HOUR FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(MINUTE FROM sum(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(SECOND FROM sum(test_time)), 'fm00')
        from 
            ${schemaName}.${statement_table} 
        where
            attempt_id = s.attempt_id and user_id =$2 and event_type = 'Assessment Item' and assessment_id = $1) as time_spent,
        (select 
            to_char(EXTRACT(HOUR FROM avg(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(MINUTE FROM avg(test_time)), 'fm00') || ':' ||
            to_char(EXTRACT(SECOND FROM avg(test_time)), 'fm00')
        from 
                ${schemaName}.${statement_table} 
        where
            attempt_id = s.attempt_id and user_id =$2 and event_type = 'Assessment Item' and assessment_id = $1) as average_time_spent,
        (case when last_update_dt is not null then 'Completed' else 'In-Progress' end) as status,
        (select 
            sum(test_minutes) 
        from 
            learninganalytics.statements 
        where 
            attempt_id = s.attempt_id and user_id = $2 and event_type = 'Assessment Item'
            and assessment_id = $1 ) as test_minute,
        (case when s.attempt_id = max(attempt_id) OVER() then 'Current' else 'Previous' end) as attempt_status,
        final_skill::double precision as skill
    from 
        ${schemaName}.${statement_table} s
    where 
        s.user_id =$2 and s.event_type = 'Assessment' and s.assessment_id = $1
    group by 
        s.attempt_id, s.submit_time, s.last_update_dt, s.final_skill;`

const leaderboard_query = `
    select
        "rank" as rank,
        user_name as name,
        Round(percentage::numeric*100,2) as percentage,
        final_skill as skill,
        (to_char(EXTRACT(HOUR FROM avg((test_time))), 'fm00') || ':' ||
        to_char(EXTRACT(MINUTE FROM avg((test_time))), 'fm00') || ':' ||
        to_char(EXTRACT(SECOND FROM avg((test_time))), 'fm00')) as total_test_time
    from 
            ${schemaName}.${rank_table} svr
    where 
        svr.assessment_id = $1 and uid IN (1, 2, 3, 4, 5)
    group by 
        svr.rank,svr.user_name, svr.percentage, svr.final_skill;`

module.exports = {
    head_reports_individual_query,
    table_view_summary_query,
    leaderboard_query
}