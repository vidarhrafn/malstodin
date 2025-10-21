const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  console.log('🔹 Supabase function called, action:', event.body);
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Athuga hvort environment variables eru til
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error('❌ Missing Supabase environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Supabase configuration missing' })
      };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { action, ...params } = JSON.parse(event.body);
    console.log('🔹 Action:', action, 'Params:', params);

    // LOGIN
    if (action === 'login') {
      const { username, password } = params;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        console.log('❌ Login failed:', error);
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Rangt notendanafn eða lykilorð' })
        };
      }

      console.log('✅ Login successful:', username);
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

    // SAVE PROGRESS
    if (action === 'saveProgress') {
      const { user_id, exercise_id, completed, score, quiz_score, tf_score, mc_score, short_score, matching_score, open_score } = params;
      
      console.log('🔹 Attempting to save progress:', { user_id, exercise_id, completed, score, quiz_score, tf_score, mc_score, short_score, matching_score, open_score });
      
      // Build the data object, only including fields that are defined
      const progressData = {
        user_id,
        exercise_id,
        completed,
        score,
        quiz_score
      };
      
      // Add optional score fields if they exist
      if (tf_score !== undefined) progressData.tf_score = tf_score;
      if (mc_score !== undefined) progressData.mc_score = mc_score;
      if (short_score !== undefined) progressData.short_score = short_score;
      if (matching_score !== undefined) progressData.matching_score = matching_score;
      if (open_score !== undefined) progressData.open_score = open_score;
      
      const { data, error } = await supabase
        .from('progress')
        .upsert(
          progressData,
          {
            onConflict: 'user_id,exercise_id'
          }
        )
        .select();

      if (error) {
        console.error('❌ Supabase error:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message })
        };
      }

      console.log('✅ Progress saved successfully:', data);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data })
      };
    }

    // SAVE ACTIVITY
    if (action === 'saveActivity') {
      const { user_id, exercise_id, activity_type, data, time_spent } = params;
      
      const { error } = await supabase
        .from('activity')
        .insert({
          user_id,
          exercise_id,
          activity_type,
          data,
          time_spent: time_spent || null  // Allow null or use provided value
        });

      if (error) {
        console.error('❌ Activity save error:', error);
        throw error;
      }

      console.log('✅ Activity saved successfully');
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    // GET ALL USERS - fyrir kennara dashboard
    if (action === 'getAllUsers') {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, role')
        .eq('role', 'student')
        .order('username');

      if (error) {
        console.error('❌ Get users error:', error);
        throw error;
      }

      console.log('✅ Retrieved users:', data.length);
      return {
        statusCode: 200,
        body: JSON.stringify({ users: data })
      };
    }

    // GET ALL PROGRESS - fyrir kennara dashboard
    if (action === 'getAllProgress') {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Get progress error:', error);
        throw error;
      }

      console.log('✅ Retrieved progress records:', data.length);
      return {
        statusCode: 200,
        body: JSON.stringify({ progress: data })
      };
    }

    // GET PROGRESS - sækja framvindu fyrir einn nemanda
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

    console.error('❌ Unknown action:', action);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Óþekkt aðgerð: ' + action })
    };

  } catch (error) {
    console.error('❌ Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      })
    };
  }
};
