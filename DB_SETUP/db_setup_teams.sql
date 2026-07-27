use `The Heathens Store`;

-- EPL
INSERT INTO teams (name, team_type, league_id)
SELECT t.team_name, 'club', l.id
FROM (
    SELECT 'Arsenal' AS team_name UNION ALL
    SELECT 'Aston Villa' UNION ALL
    SELECT 'Bournemouth' UNION ALL
    SELECT 'Brentford' UNION ALL
    SELECT 'Brighton & Hove Albion' UNION ALL
    SELECT 'Chelsea' UNION ALL
    SELECT 'Crystal Palace' UNION ALL
    SELECT 'Everton' UNION ALL
    SELECT 'Fulham' UNION ALL
    SELECT 'Ipswich Town' UNION ALL
    SELECT 'Leicester City' UNION ALL
    SELECT 'Liverpool' UNION ALL
    SELECT 'Manchester City' UNION ALL
    SELECT 'Manchester United' UNION ALL
    SELECT 'Newcastle United' UNION ALL
    SELECT 'Nottingham Forest' UNION ALL
    SELECT 'Southampton' UNION ALL
    SELECT 'Tottenham Hotspur' UNION ALL
    SELECT 'West Ham United' UNION ALL
    SELECT 'Wolverhampton Wanderers'
) t
JOIN leagues l ON l.name = 'Premier League';

-- Championship
INSERT INTO teams (name, team_type, league_id)
SELECT t.team_name, 'club', l.id
FROM (
    SELECT 'Burnley' AS team_name UNION ALL
    SELECT 'Luton Town' UNION ALL
    SELECT 'Sheffield United' UNION ALL
    SELECT 'Leeds United' UNION ALL
    SELECT 'West Bromwich Albion' UNION ALL
    SELECT 'Norwich City' UNION ALL
    SELECT 'Sunderland' UNION ALL
    SELECT 'Middlesbrough' UNION ALL
    SELECT 'Coventry City' UNION ALL
    SELECT 'Hull City' UNION ALL
    SELECT 'Watford' UNION ALL
    SELECT 'Stoke City' UNION ALL
    SELECT 'Derby County' UNION ALL
    SELECT 'Portsmouth' UNION ALL
    SELECT 'Swansea City' UNION ALL
    SELECT 'Blackburn Rovers'
) t
JOIN leagues l ON l.name = 'EFL Championship';

-- La Liga
INSERT INTO teams (name, team_type, league_id)
SELECT t.team_name, 'club', l.id
FROM (
    SELECT 'Real Madrid' AS team_name UNION ALL
    SELECT 'FC Barcelona' UNION ALL
    SELECT 'Atlético Madrid' UNION ALL
    SELECT 'Girona FC' UNION ALL
    SELECT 'Athletic Bilbao' UNION ALL
    SELECT 'Real Sociedad' UNION ALL
    SELECT 'Real Betis' UNION ALL
    SELECT 'Villarreal CF' UNION ALL
    SELECT 'Valencia CF' UNION ALL
    SELECT 'Deportivo Alavés' UNION ALL
    SELECT 'Sevilla FC' UNION ALL
    SELECT 'Celta Vigo' UNION ALL
    SELECT 'Getafe CF' UNION ALL
    SELECT 'RCD Mallorca' UNION ALL
    SELECT 'Rayo Vallecano' UNION ALL
    SELECT 'UD Las Palmas' UNION ALL
    SELECT 'CA Osasuna' UNION ALL
    SELECT 'Real Valladolid' UNION ALL
    SELECT 'CD Leganés' UNION ALL
    SELECT 'RCD Espanyol'
) t
JOIN leagues l ON l.name = 'La Liga';

-- Bundesliga
INSERT INTO teams (name, team_type, league_id)
SELECT t.team_name, 'club', l.id
FROM (
    SELECT 'Bayer Leverkusen' AS team_name UNION ALL
    SELECT 'Bayern Munich' UNION ALL
    SELECT 'VfB Stuttgart' UNION ALL
    SELECT 'RB Leipzig' UNION ALL
    SELECT 'Borussia Dortmund' UNION ALL
    SELECT 'Eintracht Frankfurt' UNION ALL
    SELECT 'TSG Hoffenheim' UNION ALL
    SELECT 'SC Freiburg' UNION ALL
    SELECT 'Heidenheim' UNION ALL
    SELECT 'Werder Bremen' UNION ALL
    SELECT 'Augsburg' UNION ALL
    SELECT 'VfL Wolfsburg' UNION ALL
    SELECT 'Mainz 05' UNION ALL
    SELECT 'Borussia Mönchengladbach' UNION ALL
    SELECT 'Union Berlin' UNION ALL
    SELECT 'St. Pauli' UNION ALL
    SELECT 'Holstein Kiel' UNION ALL
    SELECT 'VfL Bochum'
) t
JOIN leagues l ON l.name = 'Bundesliga';

-- Ligue 1
INSERT INTO teams (name, team_type, league_id)
SELECT t.team_name, 'club', l.id
FROM (
    SELECT 'Paris Saint-Germain' AS team_name UNION ALL
    SELECT 'AS Monaco' UNION ALL
    SELECT 'Lille OSC' UNION ALL
    SELECT 'Stade Brestois 29' UNION ALL
    SELECT 'OGC Nice' UNION ALL
    SELECT 'Olympique Lyonnais' UNION ALL
    SELECT 'RC Lens' UNION ALL
    SELECT 'Olympique de Marseille' UNION ALL
    SELECT 'Stade de Reims' UNION ALL
    SELECT 'Stade Rennais' UNION ALL
    SELECT 'Toulouse FC' UNION ALL
    SELECT 'Montpellier HSC' UNION ALL
    SELECT 'RC Strasbourg' UNION ALL
    SELECT 'FC Nantes' UNION ALL
    SELECT 'Le Havre AC' UNION ALL
    SELECT 'AS Saint-Étienne' UNION ALL
    SELECT 'AJ Auxerre' UNION ALL
    SELECT 'Angers SCO'
) t
JOIN leagues l ON l.name = 'Ligue 1';

-- Serie A
INSERT INTO teams (name, team_type, league_id)
SELECT t.team_name, 'club', l.id
FROM (
    SELECT 'Inter Milan' AS team_name UNION ALL
    SELECT 'AC Milan' UNION ALL
    SELECT 'Juventus' UNION ALL
    SELECT 'Atalanta' UNION ALL
    SELECT 'Bologna' UNION ALL
    SELECT 'AS Roma' UNION ALL
    SELECT 'Lazio' UNION ALL
    SELECT 'Fiorentina' UNION ALL
    SELECT 'Napoli' UNION ALL
    SELECT 'Torino' UNION ALL
    SELECT 'Genoa' UNION ALL
    SELECT 'Monza' UNION ALL
    SELECT 'Hellas Verona' UNION ALL
    SELECT 'Lecce' UNION ALL
    SELECT 'Udinese' UNION ALL
    SELECT 'Cagliari' UNION ALL
    SELECT 'Empoli' UNION ALL
    SELECT 'Parma' UNION ALL
    SELECT 'Como' UNION ALL
    SELECT 'Venezia'
) t
JOIN leagues l ON l.name = 'Serie A';