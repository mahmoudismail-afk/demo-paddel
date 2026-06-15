import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getCloudflareDB(): any | null {
  try {
    const ctx = getRequestContext();
    if (ctx && ctx.env && (ctx.env as any).DB) return (ctx.env as any).DB;
  } catch { /* noop */ }
  return null;
}

// Simple authentication check
function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(':');
  
  let expectedPassword = 'stars';
  try {
    const ctx = getRequestContext();
    if (ctx && ctx.env && (ctx.env as any).ADMIN_PASSWORD) {
      expectedPassword = (ctx.env as any).ADMIN_PASSWORD;
    }
  } catch {
    if (typeof process !== 'undefined' && process.env.ADMIN_PASSWORD) {
      expectedPassword = process.env.ADMIN_PASSWORD;
    }
  }
    
  return username === 'admin' && password === expectedPassword;
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const db = getCloudflareDB();
    if (db) {
      const { results } = await db.prepare(
        'SELECT id, court_id, player_name, player_phone, date, start_time, end_time, duration, status, created_at FROM bookings ORDER BY date DESC, start_time DESC'
      ).all();
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error('Admin GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json([]);
}

export async function PATCH(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const db = getCloudflareDB();
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    if (db) {
      await db.prepare('UPDATE bookings SET status = ? WHERE id = ?')
        .bind(status, id)
        .run();
      return NextResponse.json({ success: true, id, status });
    }
    
    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error('Admin PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
