use `The Heathens Store`;

-- Vietnam
INSERT INTO leagues (name, nation_id)
SELECT league_name, n.id
FROM (
    SELECT 'V.League 1' AS league_name
    UNION ALL SELECT 'V.League 2'
    UNION ALL SELECT 'Giải hạng Nhì quốc gia'
) l
JOIN nations n ON n.code = 'VIE';
-- England
INSERT INTO leagues (name, nation_id)
SELECT league_name, n.id
FROM (
    SELECT 'Premier League' AS league_name
    UNION ALL SELECT 'EFL Championship'
    UNION ALL SELECT 'EFL League One'
    UNION ALL SELECT 'EFL League Two'
) l
JOIN nations n ON n.code = 'ENG';

-- Thêm La Liga (Spain)
INSERT INTO leagues (name, nation_id)
SELECT league_name, n.id
FROM (
    SELECT 'La Liga' AS league_name
    UNION ALL SELECT 'La Liga 2'
    UNION ALL SELECT 'Primera Federación'
) l
JOIN nations n ON n.code = 'SPA';
-- Germany
INSERT INTO leagues (name, nation_id)
SELECT league_name, n.id
FROM (
    SELECT 'Bundesliga' AS league_name
    UNION ALL SELECT '2. Bundesliga'
) l
JOIN nations n ON n.code = 'GER';
-- Thêm Ligue 1 (France)
INSERT INTO leagues (name, nation_id)
SELECT league_name, n.id
FROM (
    SELECT 'Ligue 1' AS league_name
    UNION ALL SELECT 'Ligue 2'
) l
JOIN nations n ON n.code = 'FRA';

-- Italy
INSERT INTO leagues (name, nation_id)
SELECT league_name, n.id
FROM (
    SELECT 'Serie A' AS league_name
    UNION ALL SELECT 'Serie B'
) l
JOIN nations n ON n.code = 'ITA';




