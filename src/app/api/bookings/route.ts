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

// In-memory store for local Next.js dev
if (!(globalThis as any).localBookings) {
  (globalThis as any).localBookings = [];
}
if (!(globalThis as any).localLock) {
  (globalThis as any).localLock = false;
}

const getLocalBookings = () => (globalThis as any).localBookings;
const getLocalLock = () => (globalThis as any).localLock;
const setLocalLock = (v: boolean) => (globalThis as any).localLock = v;

/** True if [aStart, aEnd) overlaps [bStart, bEnd) */
function timesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && aEnd > bStart;
}

// ─── GET /api/bookings ───────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const courtId = searchParams.get('courtId');

  try {
    const db = getCloudflareDB();
    if (db) {
      let query = 'SELECT id, court_id, date, start_time, end_time, duration, status FROM bookings WHERE status = ?';
      const params: any[] = ['confirmed'];
      if (date)    { query += ' AND date = ?';     params.push(date); }
      if (courtId) { query += ' AND court_id = ?'; params.push(courtId); }
      query += ' ORDER BY start_time ASC';

      const { results } = await db.prepare(query).bind(...params).all();
      return NextResponse.json(results);
    }

    // In-memory fallback
    const all = getLocalBookings() as any[];
    const filtered = all.filter(b => {
      if (b.status !== 'confirmed') return false;
      if (date && b.date !== date) return false;
      if (courtId && b.court_id !== courtId) return false;
      return true;
    });
    filtered.sort((a, b) => a.start_time.localeCompare(b.start_time));
    return NextResponse.json(filtered);

  } catch (error) {
    console.error('D1 GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// ─── POST /api/bookings ───────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const db = getCloudflareDB();
    const body = await request.json();
    const { courtId, playerName, playerPhone, date, startTime, endTime, duration } = body;

    if (!courtId || !playerName || !playerPhone || !date || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const id        = `booking-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const createdAt = Date.now();
    const dur       = typeof duration === 'number' ? duration : 90;

    if (db) {
      const { results: conflicts } = await db
        .prepare(
          `SELECT id FROM bookings
           WHERE court_id = ? AND date = ? AND status = 'confirmed'
             AND start_time < ? AND end_time > ?
           LIMIT 1`
        )
        .bind(courtId, date, endTime, startTime)
        .all();

      if (conflicts.length > 0) {
        return NextResponse.json(
          { error: 'This slot was just taken by someone else.' },
          { status: 409 }
        );
      }

      await db
        .prepare(
          `INSERT INTO bookings
             (id, court_id, player_name, player_phone, date, start_time, end_time, duration, status, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(id, courtId, playerName, playerPhone, date, startTime, endTime, dur, 'confirmed', createdAt)
        .run();

      const booking = {
        id, court_id: courtId, player_name: playerName, player_phone: playerPhone,
        date, start_time: startTime, end_time: endTime, duration: dur,
        status: 'confirmed', created_at: createdAt,
      };
      return NextResponse.json({ success: true, booking }, { status: 201 });
    }

    // In-memory fallback
    const maxWait = 500;
    const start   = Date.now();
    while (getLocalLock()) {
      if (Date.now() - start > maxWait) {
        return NextResponse.json({ error: 'Server busy' }, { status: 503 });
      }
      await new Promise(r => setTimeout(r, 10));
    }
    setLocalLock(true);

    const all = getLocalBookings() as any[];
    const hasConflict = all.some(b =>
      b.court_id === courtId &&
      b.date === date &&
      b.status === 'confirmed' &&
      timesOverlap(startTime, endTime, b.start_time, b.end_time)
    );

    if (hasConflict) {
      setLocalLock(false);
      return NextResponse.json({ error: 'Slot taken' }, { status: 409 });
    }

    const newBooking = {
      id, court_id: courtId, player_name: playerName, player_phone: playerPhone,
      date, start_time: startTime, end_time: endTime, duration: dur,
      status: 'confirmed', created_at: createdAt,
    };
    all.push(newBooking);

    setLocalLock(false);
    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    setLocalLock(false);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
