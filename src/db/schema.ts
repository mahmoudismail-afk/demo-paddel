import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const courts = sqliteTable('courts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'indoor' | 'outdoor'
});

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  courtId: text('court_id').notNull(),
  playerName: text('player_name').notNull(),
  playerPhone: text('player_phone').notNull(),
  date: text('date').notNull(), // YYYY-MM-DD
  startTime: text('start_time').notNull(), // HH:MM
  endTime: text('end_time').notNull(), // HH:MM
  duration: integer('duration').notNull(), // minutes
  status: text('status').notNull().default('confirmed'), // 'confirmed' | 'cancelled'
  createdAt: integer('created_at').notNull(),
});
