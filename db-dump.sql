PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE courts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL
);
INSERT INTO "courts" ("id","name","type") VALUES('court-1','Indoor Court 1','indoor');
INSERT INTO "courts" ("id","name","type") VALUES('court-2','Indoor Court 2','indoor');
INSERT INTO "courts" ("id","name","type") VALUES('court-3','Outdoor Court 1','outdoor');
INSERT INTO "courts" ("id","name","type") VALUES('court-4','Outdoor Court 2','outdoor');
INSERT INTO "courts" ("id","name","type") VALUES('court-5','Basketball Court','indoor');
INSERT INTO "courts" ("id","name","type") VALUES('court-6','Volleyball Court','indoor');
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  court_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  player_phone TEXT NOT NULL,
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at INTEGER NOT NULL
);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('test-1','court-1','Test','123','2026-06-15','10:00','11:30',90,'cancelled',1234567890);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781534572538-udswl','court-5','M','123','2026-06-15','18:00','19:30',90,'cancelled',1781534572538);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781534819568-kl6vx','court-5','M','123','2026-06-15','14:00','15:30',90,'cancelled',1781534819568);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781534971475-hiy3s','court-5','M','123','2026-06-15','11:00','12:30',90,'cancelled',1781534971475);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781535241249-3ogrh','court-1','M','123','2026-06-15','12:00','13:30',90,'cancelled',1781535241249);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781535254244-9xlxz','court-1','M','123','2026-06-15','16:00','17:30',90,'cancelled',1781535254244);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781536050451-68oy1','court-1','M','123','2026-06-15','14:00','15:30',90,'cancelled',1781536050451);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781536059337-494a4','court-1','M','123','2026-06-15','06:00','07:30',90,'cancelled',1781536059337);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781536447638-w49ee','court-5','M','123','2026-06-15','09:30','11:00',90,'cancelled',1781536447638);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781536899844-ve99w','court-1','M','123','2026-06-15','18:30','20:00',90,'cancelled',1781536899844);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781537260617-5u4ok','court-5','M','123','2026-06-15','20:00','22:00',120,'cancelled',1781537260617);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781537627476-tlwhf','court-5','M','123','2026-06-15','16:30','18:00',90,'cancelled',1781537627476);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781537672948-0hc44','court-4','M','123','2026-06-15','09:00','10:30',90,'cancelled',1781537672948);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781537806349-288tb','court-6','M','123','2026-06-15','06:00','07:30',90,'cancelled',1781537806349);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781537871249-pdzam','court-1','M','123','2026-06-15','09:30','11:00',90,'cancelled',1781537871249);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781538060653-th86l','court-1','E2E Test','000','2026-06-20','10:00','11:30',90,'cancelled',1781538060653);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781538179960-4xldu','court-5','M','123','2026-06-15','06:00','07:30',90,'cancelled',1781538179960);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781538395576-ya646','court-5','M','123','2026-06-16','09:00','10:30',90,'cancelled',1781538395576);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781538579114-stq09','court-5','M','123','2026-06-15','16:00','18:00',120,'confirmed',1781538579114);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781538629461-7osvh','court-5','M','123','2026-06-15','08:00','10:00',120,'confirmed',1781538629461);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781538715374-l67we','court-5','M','123','2026-06-15','21:00','22:00',60,'confirmed',1781538715374);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781539928181-4zhnb','court-6','M','123','2026-06-16','12:00','13:30',90,'cancelled',1781539928181);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781540710423-pcyn4','court-3','M','123','2026-06-15','10:30','12:00',90,'confirmed',1781540710423);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781540727568-33qpg','court-3','M','123','2026-06-16','07:00','08:30',90,'confirmed',1781540727568);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781541974697-yipzn','court-5','M','123','2026-06-16','06:00','07:30',90,'confirmed',1781541974697);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781548369778-liq2n','court-5','M','123','2026-06-16','21:00','23:00',120,'cancelled',1781548369778);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781553262634-05yw9','court-5','M','123','2026-06-16','10:00','12:00',120,'confirmed',1781553262634);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781685529871-p0u5j','court-5','M','123','2026-06-17','07:00','09:00',120,'confirmed',1781685529871);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781882227358-01lee','court-5','M','123','2026-06-20','13:30','15:00',90,'confirmed',1781882227358);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781882261643-m6l1n','court-1','M','123','2026-06-20','15:30','17:00',90,'confirmed',1781882261643);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781949234315-tqpqy','court-5','M','123','2026-06-20','09:30','11:00',90,'confirmed',1781949234315);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1781949265828-7n6i4','court-5','M','123','2026-06-27','13:30','15:00',90,'confirmed',1781949265828);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1782058912267-snsd7','court-5','M','123','2026-06-22','18:30','20:00',90,'confirmed',1782058912267);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1782235878995-lfs62','court-5','M','123','2026-06-25','14:00','16:00',120,'confirmed',1782235878995);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1782406144725-81tmm','court-5','M','123','2026-06-26','13:30','15:30',120,'confirmed',1782406144725);
INSERT INTO "bookings" ("id","court_id","player_name","player_phone","date","start_time","end_time","duration","status","created_at") VALUES('booking-1783243293383-1z2ri','court-6','M','123','2026-07-07','17:00','19:00',120,'confirmed',1783243293383);
