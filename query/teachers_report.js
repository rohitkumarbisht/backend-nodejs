const { schemaName, rank_table, statement_table, statement_view_table } = require('../config/config.js');

const head_reports_teacher_query = `
    SELECT

    --*Total number of users*
        (select
            count(distinct(st.user_id))
        from 
            ${schemaName}.${statement_view_table} as st
        where 
            st.event_type = 'Assessment' and st.last_update_dt is not null) as total_students,

    --*Total number of assessments attempted*
        (select
            count(st.assessment_id)
        from 
            ${schemaName}.${statement_table} as st
        where 
            st.event_type = 'Assessment') as assessment_attempted,

    --*Average percentage*
        --* (select
           --* round(avg(st.given_score::numeric/st.max_score::numeric *100),2)
        --* from 
            --* ${schemaName}.${statement_view_table} as st
        --* where 
            --* st.event_type = 'Assessment' and st.last_update_dt is not null) as overall_percentage,
    
    --*Percentage of correct questions*
        round(sum(given_score)::numeric/sum(max_score)::numeric*100,2) as overall_percentage,

    --*Average test time*
        (select 
            to_char(extract (HOUR from avg(st.test_time)), 'fm00')||':'||
            to_char(extract (MINUTE from avg(st.test_time)), 'fm00')||':'||
            to_char(extract (SECOND from avg(st.test_time)), 'fm00') 
        from 
            ${schemaName}.${statement_view_table} as st
        where 
            st.event_type = 'Assessment' and st.last_update_dt is not null) as average_test_time,

    --*Completed assessments*
        (select
            count(st.given_score)
        from
            ${schemaName}.${statement_table} as st 
        where
            st.event_type = 'Assessment' and st.last_update_dt is not null) as completed_assessments,

    --*In-Progress assessments*
        (select
            count(st.assessment_id)-count(st.given_score)
        from
            ${schemaName}.${statement_table} as st 
        where
            st.event_type = 'Assessment') as in_progress_assessments,

    --*Percentage of correct questions*
        round(sum(given_score)::numeric/sum(max_score)::numeric*100,2) as correct_percentage,

    --*Percentage of incorrect questions*
        round((sum(max_score)::numeric - sum(given_score)::numeric)/sum(max_score)::numeric*100,2) as incorrect_percentage,

    --*Number of correct questions*
        sum(given_score) as correct_questions,

    --*Number of incorrect questions*
        sum(max_score)-sum(given_score) as incorrect_questions,

    --*Time spent on correct questions*
        (select
            to_char(extract (HOUR from sum(st.test_time)), 'fm00')||':'||
            to_char(extract (MINUTE from sum(st.test_time)), 'fm00')||':'||
            to_char(extract (SECOND from sum(st.test_time)), 'fm00')
        from
            ${schemaName}.${statement_view_table} as st
        where
            st.given_score=1 and st.event_type='Assessment Item' and st.last_update_dt is not null) as time_spent_on_correct,

    --*Time spent on incorrect questions*
        (select
            to_char(extract (HOUR from sum(st.test_time)), 'fm00')||':'||
            to_char(extract (MINUTE from sum(st.test_time)), 'fm00')||':'||
            to_char(extract (SECOND from sum(st.test_time)), 'fm00')
        from
            ${schemaName}.${statement_view_table} as st
        where
            st.given_score=0 and st.event_type='Assessment Item' and st.last_update_dt is not null) as time_spent_on_incorrect
    from 
        ${schemaName}.${statement_view_table} as s 
    where 
        s.event_type = 'Assessment Item' and s.last_update_dt is not null;`

const assessment_percentage_teacher_query = `
    SELECT

    --*Assessment Id of assessment*
        distinct(s.assessment_id) as assessment_id,

    --*Name of assessment*
        s.assessment_txt as assessment_name,

    --*Minimum marks scored in assessment*
        (select
            min(round(st.given_score::numeric/st.max_score::numeric*100,2))
        from
            ${schemaName}.${statement_view_table} as st
        where 
            st.assessment_id = s.assessment_id and st.event_type='Assessment' and st.last_update_dt is not null) as min_percentage,

    --*Average marks scored in assessment*
        (select
            round(avg(st.given_score::numeric/st.max_score::numeric*100),2)
        from
            ${schemaName}.${statement_view_table} as st
        where 
            st.assessment_id = s.assessment_id and st.event_type='Assessment' and st.last_update_dt is not null) as average_percentage,

    --*Maximum marks scored in assessment*
        (select
            max(round(st.given_score::numeric/st.max_score::numeric*100,2))
        from
            ${schemaName}.${statement_view_table} as st
        where 
            st.assessment_id = s.assessment_id and st.event_type='Assessment' and st.last_update_dt is not null) as max_percentage
    from 
        ${schemaName}.${statement_view_table} as s 
    where 
        s.event_type='Assessment' and s.last_update_dt is not null;`

    const leaderboard_teacher_query =`
    SELECT
        
    --*Rank of students*
        sr."rank" as rank,

    --*Name of students*
        sr.user_name as name,

    --*Assessment name of assessment attempted by students*
        sr.assessment_txt as assessment_name,

    --*Assessment Id of assessment attempted by students*
        sr.assessment_id as assessment_id,
        
    --*Percentage obtained in assessment attempted by students*
        round(sr.given_score::numeric / sr.max_score::numeric *100,2) as percentage,

    --*Skill of the students in assessment*
        sr.final_skill as skill,
        
    --*Time spent on the assessment by students*
        to_char(extract (HOUR from (sr.test_time)), 'fm00')||':'||
        to_char(extract (MINUTE from (sr.test_time)), 'fm00')||':'||
        to_char(extract (SECOND from (sr.test_time)), 'fm00') as test_time
    from
        ${schemaName}.${rank_table} as sr
    where
        sr.uid in (1,2,3,4,5);`

module.exports = {
    head_reports_teacher_query,
    assessment_percentage_teacher_query,
    leaderboard_teacher_query
}