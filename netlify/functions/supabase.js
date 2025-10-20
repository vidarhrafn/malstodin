const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // Leyfa bara POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Tengja við Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    const { action, ...params } = JSON.parse(event.body);

    // LOGIN - athuga notendanafn og lykilorð
    if (action === 'login') {
      const { username, password } = params;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Rangt notendanafn eða lykilorð' })
        };
      }

      // Hér ættum við að athuga lykilorð (kemur síðar)
      // Núna bara leyfa innskráningu ef notandi er til
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          user: {
            id: data.id,
            username: data.username,
            role: data.role
          }
        })
      };
    }

    // SAVE PROGRESS - vista framvindu
    if (action === 'saveProgress') {
      const { user_id, exercise_id, completed, score } = params;
      
      const { error } = await supabase
        .from('progress')
        .upsert({
          user_id,
          exercise_id,
          completed,
          score
        });

      if (error) throw error;

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    // SAVE ACTIVITY - vista virkni
    if (action === 'saveActivity') {
      const { user_id, exercise_id, activity_type, data, time_spent } = params;
      
      const { error } = await supabase
        .from('activity')
        .insert({
          user_id,
          exercise_id,
          activity_type,
          data,
          time_spent
        });

      if (error) throw error;

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    // GET PROGRESS - sækja framvindu (fyrir kennara)
    if (action === 'getProgress') {
      const { user_id } = params;
      
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user_id);

      if (error) throw error;

      return {
        statusCode: 200,
        body: JSON.stringify({ progress: data })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Óþekkt aðgerð' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
