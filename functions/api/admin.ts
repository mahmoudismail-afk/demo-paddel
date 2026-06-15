// Simple authentication check
function isAuthenticated(request: Request, env: any) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(':');
  
  // Only accept 'admin' as username, and match against env.ADMIN_PASSWORD if available
  // Fallback to 'stars' if no env var is set
  const expectedPassword = env && env.ADMIN_PASSWORD ? env.ADMIN_PASSWORD : 'stars';
    
  return username === 'admin' && password === expectedPassword;
}

export async function onRequestGet(context: any) {
  const { request, env } = context;

  // Check authentication
  if (!isAuthenticated(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    if (env.DB) {
      const { results } = await env.DB.prepare(
        'SELECT id, court_id, player_name, player_phone, date, start_time, end_time, duration, status, created_at FROM bookings ORDER BY date DESC, start_time DESC'
      ).all();
      return Response.json(results);
    }
  } catch (error) {
    console.error('Admin GET error:', error);
    return Response.json({ error: 'Database error' }, { status: 500 });
  }

  // Fallback for local testing
  return Response.json([]);
}

export async function onRequestPatch(context: any) {
  const { request, env } = context;

  if (!isAuthenticated(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const body = await request.json() as any;
    const { id, status } = body;

    if (!id || !status) {
      return Response.json({ error: 'Missing id or status' }, { status: 400 });
    }

    if (env.DB) {
      await env.DB.prepare('UPDATE bookings SET status = ? WHERE id = ?')
        .bind(status, id)
        .run();
        
      return Response.json({ success: true, id, status });
    }
    
    return Response.json({ success: true, id, status });
  } catch (error) {
    console.error('Admin PATCH error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
