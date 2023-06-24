INSERT INTO "apartment" ("created_at", "updated_at", "deleted_at", "id", "name", "address") VALUES
('2023-06-24 04:41:03.809346',	'2023-06-24 04:41:03.809346',	NULL,	1,	'Hoa Sen',	'262/20 Lạc Long Quân, P.10, Q11, TP.HCM');


INSERT INTO "customer" ("created_at", "updated_at", "deleted_at", "id") VALUES
('2023-06-24 04:51:08.376358',	'2023-06-24 04:51:08.376358',	NULL,	'1032fc98-1901-4e89-8dd9-9f15319057e8');


INSERT INTO "room" ("created_at", "updated_at", "deleted_at", "id", "code", "price") VALUES
('2023-06-24 04:41:47.300626',	'2023-06-24 04:41:47.300626',	NULL,	1,	'1A1',	20),
('2023-06-24 04:42:25.659927',	'2023-06-24 04:42:25.659927',	NULL,	2,	'1A2',	50),
('2023-06-24 04:42:43.310386',	'2023-06-24 04:42:43.310386',	NULL,	3,	'2A1',	110),
('2023-06-24 04:42:58.414046',	'2023-06-24 04:42:58.414046',	NULL,	4,	'2A2',	100),
('2023-06-24 15:15:39.244952',	'2023-06-24 15:15:39.244952',	NULL,	5,	'3A1',	50),
('2023-06-24 15:16:10.329424',	'2023-06-24 15:16:10.329424',	NULL,	6,	'3A2',	50);


INSERT INTO "booking" ("created_at", "updated_at", "deleted_at", "id", "room_id", "customer_id", "start_date", "end_date") VALUES
('2023-06-24 04:55:25.72435',	'2023-06-24 04:55:25.72435',	NULL,	2,	1,	'1032fc98-1901-4e89-8dd9-9f15319057e8',	'2023-06-25 00:00:00',	'2023-06-30 00:00:00'),
('2023-06-24 10:45:39.261808',	'2023-06-24 10:45:39.261808',	NULL,	6,	1,	'1032fc98-1901-4e89-8dd9-9f15319057e8',	'2023-07-01 00:00:00',	'2023-07-05 00:00:00'),
('2023-06-24 10:46:37.038766',	'2023-06-24 10:46:37.038766',	NULL,	7,	1,	'1032fc98-1901-4e89-8dd9-9f15319057e8',	'2023-07-08 00:00:00',	'2023-07-10 00:00:00'),
('2023-06-24 10:46:39.249342',	'2023-06-24 10:46:39.249342',	NULL,	8,	2,	'1032fc98-1901-4e89-8dd9-9f15319057e8',	'2023-07-08 00:00:00',	'2023-07-10 00:00:00'),
('2023-06-24 11:18:11.653985',	'2023-06-24 11:18:11.653985',	NULL,	9,	2,	'1032fc98-1901-4e89-8dd9-9f15319057e8',	'2023-07-12 00:00:00',	'2023-07-13 00:00:00'),
('2023-06-24 11:18:11.653985',	'2023-06-24 11:18:11.653985',	NULL,	10,	3,	'1032fc98-1901-4e89-8dd9-9f15319057e8',	'2023-07-03 00:00:00',	'2023-08-20 00:00:00');