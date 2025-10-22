
-- lokalizacje

IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Kronplatz')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Kronplatz');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Marilleva')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Marilleva');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Madonna di Campiglio')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Madonna di Campiglio');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Folgarida')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Folgarida');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Livigno')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Livigno');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Passo del Tonale')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Passo del Tonale');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Sella Ronda - Val Gardena')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Sella Ronda - Val Gardena');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Schladming - Dachstein')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Schladming - Dachstein');
IF NOT EXISTS (SELECT 1 FROM localizations WHERE name = 'Nassfeld - Austria')
    INSERT INTO localizations (id, name) VALUES (NEWID(), 'Nassfeld - Austria');


-- gigainsert

DECLARE @loc TABLE (
    name nvarchar(200) PRIMARY KEY,
    id uniqueidentifier,
    min_date date,
    max_date date,
    saturday_allowed bit
);
INSERT INTO @loc (name, id, min_date, max_date, saturday_allowed)
SELECT 'Kronplatz', l.id, '2025-12-07', '2026-04-03', 0 FROM localizations l WHERE l.name='Kronplatz'
UNION ALL SELECT 'Marilleva', l.id, '2025-12-07', '2026-04-03', 1 FROM localizations l WHERE l.name='Marilleva'
UNION ALL SELECT 'Madonna di Campiglio', l.id, '2025-12-07', '2026-04-03', 1 FROM localizations l WHERE l.name='Madonna di Campiglio'
UNION ALL SELECT 'Folgarida', l.id, '2025-12-07', '2026-04-03', 1 FROM localizations l WHERE l.name='Folgarida'
UNION ALL SELECT 'Livigno', l.id, '2025-11-30', '2026-05-01', 1 FROM localizations l WHERE l.name='Livigno'
UNION ALL SELECT 'Passo del Tonale', l.id, '2026-01-18', '2026-02-27', 1 FROM localizations l WHERE l.name='Passo del Tonale'
UNION ALL SELECT 'Sella Ronda - Val Gardena', l.id, '2026-01-18', '2026-02-27', 0 FROM localizations l WHERE l.name='Sella Ronda - Val Gardena'
UNION ALL SELECT 'Schladming - Dachstein', l.id, '2026-01-18', '2026-02-27', 0 FROM localizations l WHERE l.name='Schladming - Dachstein'
UNION ALL SELECT 'Nassfeld - Austria', l.id, '2026-01-18', '2026-02-20', 0 FROM localizations l WHERE l.name='Nassfeld - Austria';

-- Wylaczone zakresy dat (z JS)
DECLARE @ex TABLE (
    location_name nvarchar(200),
    from_date date,
    to_date   date
);
INSERT INTO @ex (location_name, from_date, to_date) VALUES
('Livigno', '2026-01-31', '2026-02-28'),
('Sella Ronda - Val Gardena', '2026-02-07', '2026-02-21'),
('Schladming - Dachstein',    '2026-02-07', '2026-02-21'),
('Nassfeld - Austria',        '2026-02-07', '2026-02-14');

-- Blokada „Poziom 0” dla czesci lokalizacji (z JS)
DECLARE @blocked_p0 TABLE (location_name nvarchar(200) PRIMARY KEY);
INSERT INTO @blocked_p0 (location_name) VALUES
('Sella Ronda - Val Gardena'),
('Madonna di Campiglio'),
('Nassfeld - Austria');

-- Sloty godzinowe
-- WEEKDAY: 08:50-09:45, 15:20-16:15
DECLARE @weekday_slots TABLE (start_time time, end_time time);
INSERT INTO @weekday_slots VALUES ('08:50', '09:45'), ('15:20','16:15');

-- SATURDAY: 8 slotow
DECLARE @saturday_slots TABLE (start_time time, end_time time);
INSERT INTO @saturday_slots VALUES
('08:55','09:50'),('09:50','10:45'),('10:45','11:40'),('11:40','12:35'),
('12:35','13:30'),('13:30','14:25'),('14:25','15:20'),('15:20','16:15');

/* =========================================================
   GENERATOR DNI (tally) + FILTRY z zasad JS
   ========================================================= */
;WITH nums AS (
    SELECT 0 AS n
    UNION ALL SELECT n+1 FROM nums WHERE n < 400 /* zabezpieczenie: ~400 dni */
),
dates AS (
    SELECT l.name, l.id AS localization_id,
           DATEADD(day, n, l.min_date) AS d,
           l.min_date, l.max_date, l.saturday_allowed
    FROM @loc l
    JOIN nums ON DATEADD(day, n, l.min_date) <= l.max_date
),
filtered AS (
    SELECT d.*
    FROM dates d
    WHERE
      -- w zakresie
      d.d BETWEEN d.min_date AND d.max_date
      -- jesli sobota i nie dozwolona -> wytnij
      AND NOT (DATEPART(weekday, d.d) = 7 /* sobota w polskim ustawieniu moze byc inny numer; bezpieczniej liczymy tak nizej */ AND d.saturday_allowed = 0)
      -- uwaga: DATEFIRST w SQL Server domyslnie 7 (niedziela). Zrobmy swoj test soboty:
      AND NOT ((DATEPART(WEEKDAY, d.d) + @@DATEFIRST) % 7 = 6 AND d.saturday_allowed = 0)
      -- wylaczone zakresy
      AND NOT EXISTS (
          SELECT 1 FROM @ex x
          WHERE x.location_name = d.name
            AND d.d BETWEEN x.from_date AND x.to_date
      )
)
-- =========================================================
-- WSTAWKI DO individual_lessons:
--  • dla dni roboczych: 2 sloty
--  • dla soboty: 8 slotow (tylko gdzie dozwolone)
--  • instructor_id: NULL (zmapujesz potem)
--  • price: 0.00 (placeholder; w JS liczysz wg liczby osob/godziny/soboty)
-- =========================================================
INSERT INTO individual_lessons (id, instructor_id, localizations_id, date, start_time, end_time, price, maxParticipants)
SELECT NEWID(), NULL, f.localization_id, f.d, s.start_time, s.end_time, CAST(0.00 AS numeric(10,2)), DEFAULT
FROM filtered f
CROSS APPLY (
    SELECT start_time, end_time
    FROM (
        -- jesli sobota -> sloty sobotnie
        SELECT start_time, end_time
        FROM @saturday_slots
        WHERE ((DATEPART(WEEKDAY, f.d) + @@DATEFIRST) % 7 = 6)  -- nasza definicja soboty
              AND f.saturday_allowed = 1
        UNION ALL
        -- pozostale dni -> weekday sloty
        SELECT start_time, end_time
        FROM @weekday_slots
        WHERE ((DATEPART(WEEKDAY, f.d) + @@DATEFIRST) % 7) <> 6
    ) u
) s
OPTION (MAXRECURSION 400);

-- Ile wstawilismy?
-- SELECT COUNT(*) AS inserted_lessons FROM individual_lessons WHERE price = 0.00;

 /* =========================================================
    BLOKADA „Poziom 0”: wpisujemy dostepnosc P0
    tylko dla lokalizacji bez blokady.
    (Jesli chcesz, rozwin to do innych poziomow.)
    ========================================================= */
DECLARE @p0 uniqueidentifier = (SELECT TOP 1 id FROM levels WHERE name='Poziom 0');

IF @p0 IS NOT NULL
BEGIN
    INSERT INTO individual_lesson_available (id, individual_lessons_id, level)
    SELECT NEWID(), il.id, @p0
    FROM individual_lessons il
    JOIN localizations l ON l.id = il.localizations_id
    LEFT JOIN @blocked_p0 b ON b.location_name = l.name
    WHERE b.location_name IS NULL
      AND NOT EXISTS (
          SELECT 1 FROM individual_lesson_available ila
          WHERE ila.individual_lessons_id = il.id AND ila.level = @p0
      );
END
