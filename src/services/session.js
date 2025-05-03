const { sbquery } = require('../utils/supabase');

async function validateSession(session_id, user_name){
    const result = await sbquery(`SELECT user_session FROM exptrck_users WHERE user_session='${session_id}' AND user_name='${user_name}'`)
    //console.log(`debug API sessionid & user_name = ${session_id}, ${user_name}`)

    if(result.rowCount==1){
        return true;
    }
    else{
        console.log(`session error: submitted ID=${session_id}, DB ID=${data.session_id}`)
        return false;
    }
}

module.exports = {validateSession};