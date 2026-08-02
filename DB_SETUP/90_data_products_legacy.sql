USE `The Heathens Store`;

-- Manchester United
INSERT INTO products (name, price, stock, description, team_id, season_id, jersey_type)
SELECT 
    d.p_name, d.p_price, d.p_stock, 
    CONCAT(d.p_name, ': ', d.p_desc) AS full_desc, 
    t.id, s.id, d.p_type
FROM (
    SELECT '2024/2025' AS s_name, 'Manchester United Home 24-25' AS p_name, 100.00 AS p_price, 100 AS p_stock, 'Áo sân nhà đỏ truyền thống, chất liệu thoáng khí.' AS p_desc, 'home' AS p_type UNION ALL
    SELECT '2024/2025', 'Manchester United Away 24-25', 100.00, 75, 'Áo sân khách màu xanh navy họa tiết chìm cực đẹp.', 'away' UNION ALL
    SELECT '2024/2025', 'Manchester United Third 24-25', 110.00, 40, 'Mẫu áo thứ 3 phong cách Retro sử dụng logo Trefoil.', 'third' UNION ALL
    SELECT '2024/2025', 'Manchester United Home GK 24-25', 95.00, 30, 'Áo thủ môn sân nhà màu vàng neon nổi bật.', 'home_gk' UNION ALL
    SELECT '2024/2025', 'Manchester United Away GK 24-25', 95.00, 20, 'Áo thủ môn sân khách màu xanh lá cây.', 'away_gk' UNION ALL
    SELECT '2024/2025', 'Manchester United Third GK 24-25', 95.00, 15, 'Áo thủ môn mẫu thứ 3 màu đen họa tiết xám.', 'third_gk' UNION ALL
   
    SELECT '2025/2026' AS s_name, 'Manchester United Home 25-26' AS p_name, 105.00, 120, 'Thiết kế mới nhất với các chi tiết hiện đại.', 'home' UNION ALL
    SELECT '2025/2026', 'Manchester United Away 25-26', 105.00, 90, 'Áo sân khách trắng phối đỏ đen mang hơi hướng thập niên 90.', 'away' UNION ALL
    SELECT '2025/2026', 'Manchester United Third 25-26', 115.00, 50, 'Mẫu áo thứ 3 đặc biệt kỷ niệm lịch sử CLB.', 'third' UNION ALL
    SELECT '2025/2026', 'Manchester United Home GK 25-26', 100.00, 35, 'Áo thủ môn sân nhà mùa mới, công nghệ siêu nhẹ.', 'home_gk' UNION ALL
    SELECT '2025/2026', 'Manchester United Away GK 25-26', 100.00, 25, 'Áo thủ môn sân khách màu xanh dương đậm.', 'away_gk' UNION ALL
    SELECT '2025/2026', 'Manchester United Third GK 25-26', 100.00, 20, 'Áo thủ môn mẫu thứ 3 bản giới hạn.', 'third_gk'
) d
JOIN teams t ON t.name = 'Manchester United'
JOIN seasons s ON s.name = d.s_name;

-- Manchester City
INSERT INTO products (name, price, stock, description, team_id, season_id, jersey_type)
SELECT 
    d.p_name, d.p_price, d.p_stock, 
    CONCAT(d.p_name, ': ', d.p_desc) AS full_desc, 
    t.id, s.id, d.p_type
FROM (
    SELECT '2024/2025' AS s_name, 'Manchester City Home 24-25' AS p_name, 95.00 AS p_price, 100 AS p_stock, 'Áo sân nhà màu xanh Sky Blue đặc trưng, mã vùng 0161.' AS p_desc, 'home' AS p_type UNION ALL
    SELECT '2024/2025', 'Manchester City Away 24-25', 95.00, 75, 'Áo sân khách thiết kế sọc vàng đen huyền thoại.', 'away' UNION ALL
    SELECT '2024/2025', 'Manchester City Third 24-25', 95.00, 40, 'Mẫu áo thứ 3 màu đỏ mận phối họa tiết tinh xảo.', 'third' UNION ALL
    SELECT '2024/2025', 'Manchester City Home GK 24-25', 90.00, 30, 'Áo thủ môn sân nhà màu nâu cafe phối họa tiết.', 'home_gk' UNION ALL
    SELECT '2024/2025', 'Manchester City Away GK 24-25', 90.00, 20, 'Áo thủ môn sân khách màu cam rực rỡ.', 'away_gk' UNION ALL
    SELECT '2024/2025', 'Manchester City Third GK 24-25', 90.00, 15, 'Áo thủ môn mẫu thứ 3 màu tím than.', 'third_gk' UNION ALL
    
    SELECT '2025/2026' AS s_name, 'Manchester City Home 25-26' AS p_name, 100.00, 120, 'Thiết kế sân nhà mùa mới lấy cảm hứng từ lịch sử CLB.', 'home' UNION ALL
    SELECT '2025/2026', 'Manchester City Away 25-26', 100.00, 90, 'Áo sân khách màu xanh đậm họa tiết tối giản.', 'away' UNION ALL
    SELECT '2025/2026', 'Manchester City Third 25-26', 100.00, 50, 'Mẫu áo thứ 3 thiết kế mang đậm tính tương lai.', 'third' UNION ALL
    SELECT '2025/2026', 'Manchester City Home GK 25-26', 95.00, 35, 'Áo thủ môn sân nhà mùa 25-26, màu xanh lục bảo.', 'home_gk' UNION ALL
    SELECT '2025/2026', 'Manchester City Away GK 25-26', 95.00, 25, 'Áo thủ môn sân khách màu hồng phấn hiện đại.', 'away_gk' UNION ALL
    SELECT '2025/2026', 'Manchester City Third GK 25-26', 95.00, 20, 'Áo thủ môn mẫu thứ 3 màu xám tro carbon.', 'third_gk'
) d
JOIN teams t ON t.name = 'Manchester City'
JOIN seasons s ON s.name = d.s_name;


-- Arsenal
INSERT INTO products (name, price, stock, description, team_id, season_id, jersey_type)
SELECT 
    d.p_name, d.p_price, d.p_stock, 
    CONCAT(d.p_name, ': ', d.p_desc) AS full_desc, 
    t.id, s.id, d.p_type
FROM (
    SELECT '2025/2026' AS s_name, 'Arsenal Home 25-26' AS p_name, 105.00 AS p_price, 120 AS p_stock, 'Thiết kế sân nhà đỏ trắng với các chi tiết mạ vàng sang trọng.' AS p_desc, 'home' AS p_type UNION ALL
    SELECT '2025/2026', 'Arsenal Away 25-26', 105.00, 90, 'Áo sân khách màu vàng nhạt lấy cảm hứng từ thập niên 70.', 'away' UNION ALL
    SELECT '2025/2026', 'Arsenal Third 25-26', 115.00, 50, 'Mẫu áo thứ 3 phong cách hiện đại với công nghệ vải Heat.Rdy.', 'third' UNION ALL
    SELECT '2025/2026', 'Arsenal Home GK 25-26', 100.00, 35, 'Áo thủ môn sân nhà mùa mới, màu xanh lục bảo.', 'home_gk' UNION ALL
    SELECT '2025/2026', 'Arsenal Away GK 25-26', 100.00, 25, 'Áo thủ môn sân khách màu cam rực rỡ.', 'away_gk' UNION ALL
    SELECT '2025/2026', 'Arsenal Third GK 25-26', 100.00, 20, 'Áo thủ môn mẫu thứ 3 thiết kế tối giản đặc biệt.', 'third_gk'
) d
JOIN teams t ON t.name = 'Arsenal'
JOIN seasons s ON s.name = d.s_name;


-- PSG
INSERT INTO products (name, price, stock, description, team_id, season_id, jersey_type)
SELECT 
    d.p_name, d.p_price, d.p_stock, 
    CONCAT(d.p_name, ': ', d.p_desc) AS full_desc, 
    t.id, s.id, d.p_type
FROM (
    SELECT '2025/2026' AS s_name, 'Paris Saint-Germain Home 25-26' AS p_name, 105.00 AS p_price, 120 AS p_stock, 'Thiết kế Hechter truyền thống với phong cách hiện đại từ Nike.' AS p_desc, 'home' AS p_type UNION ALL
    SELECT '2025/2026', 'Paris Saint-Germain Away 25-26', 105.00, 90, 'Áo sân khách màu trắng sang trọng kết hợp logo Jordan Brand.', 'away' UNION ALL
    SELECT '2025/2026', 'Paris Saint-Germain Third 25-26', 115.00, 50, 'Mẫu áo thứ 3 đặc biệt mang phong cách thời trang đường phố Paris.', 'third' UNION ALL
    SELECT '2025/2026', 'Paris Saint-Germain Home GK 25-26', 100.00, 30, 'Áo thủ môn sân nhà màu vàng đồng rực rỡ.', 'home_gk' UNION ALL
    SELECT '2025/2026', 'Paris Saint-Germain Away GK 25-26', 100.00, 25, 'Áo thủ môn sân khách màu xanh bạc hà mát mẻ.', 'away_gk' UNION ALL
    SELECT '2025/2026', 'Paris Saint-Germain Third GK 25-26', 100.00, 20, 'Áo thủ môn mẫu thứ 3 màu đỏ mận huyền bí.', 'third_gk'
) d
JOIN teams t ON t.name = 'Paris Saint-Germain'
JOIN seasons s ON s.name = d.s_name;


-- Marseile
INSERT INTO products (name, price, stock, description, team_id, season_id, jersey_type)
SELECT 
    d.p_name, d.p_price, d.p_stock, 
    CONCAT(d.p_name, ': ', d.p_desc) AS full_desc, 
    t.id, s.id, d.p_type
FROM (
    SELECT '2025/2026' AS s_name, 'Olympique de Marseille Home 25-26' AS p_name, 95.00 AS p_price, 100 AS p_stock, 'Màu trắng truyền thống phối xanh sky blue, phong cách Puma đặc trưng.' AS p_desc, 'home' AS p_type UNION ALL
    SELECT '2025/2026', 'Olympique de Marseille Away 25-26', 95.00, 75, 'Thiết kế sân khách màu xanh đậm lấy cảm hứng từ thành phố cảng.', 'away' UNION ALL
    SELECT '2025/2026', 'Olympique de Marseille Third 25-26', 105.00, 40, 'Mẫu áo thứ 3 phong cách nghệ thuật đường phố Marseille.', 'third' UNION ALL
    SELECT '2025/2026', 'Olympique de Marseille Home GK 25-26', 90.00, 25, 'Áo thủ môn sân nhà màu vàng neon nổi bật.', 'home_gk' UNION ALL
    SELECT '2025/2026', 'Olympique de Marseille Away GK 25-26', 90.00, 20, 'Áo thủ môn sân khách màu hồng phấn hiện đại.', 'away_gk' UNION ALL
    SELECT '2025/2026', 'Olympique de Marseille Third GK 25-26', 90.00, 15, 'Áo thủ môn mẫu thứ 3 màu đen họa tiết đơn sắc.', 'third_gk'
) d
JOIN teams t ON t.name = 'Olympique de Marseille'
JOIN seasons s ON s.name = d.s_name;

SELECT s.name AS Season, t.name AS Team, p.name, p.jersey_type, p.price, p.stock
FROM products p
JOIN teams t ON p.team_id = t.id
JOIN seasons s ON p.season_id = s.id
WHERE t.name = 'Olympique de Marseille' AND s.name = '2025/2026';


-- La Liga
INSERT INTO products (name, price, stock, description, team_id, season_id, jersey_type)
SELECT 
    d.p_name, d.p_price, d.p_stock, 
    CONCAT(d.p_name, ': ', d.p_desc) AS full_desc, 
    t.id, s.id, d.p_type
FROM (
    SELECT '2025/2026' AS s_name, 'FC Barcelona Home 25-26' AS p_name, 100.00 AS p_price, 150 AS p_stock, 'Sọc xanh đỏ Blaugrana truyền thống với công nghệ Nike Dri-FIT.' AS p_desc, 'home' AS p_type, 'FC Barcelona' AS t_name UNION ALL
    SELECT '2025/2026', 'FC Barcelona Away 25-26', 100.00, 100, 'Thiết kế sân khách màu đen phối chi tiết vàng sang trọng.', 'away', 'FC Barcelona' UNION ALL
    SELECT '2025/2026', 'FC Barcelona Third 25-26', 110.00, 60, 'Mẫu áo thứ 3 cảm hứng từ kiến trúc nghệ thuật của thành phố.', 'third', 'FC Barcelona' UNION ALL
    SELECT '2025/2026', 'FC Barcelona Home GK 25-26', 95.00, 30, 'Áo thủ môn sân nhà màu vàng neon.', 'home_gk', 'FC Barcelona' UNION ALL
    SELECT '2025/2026', 'FC Barcelona Away GK 25-26', 95.00, 25, 'Áo thủ môn sân khách màu xanh lục bảo.', 'away_gk', 'FC Barcelona' UNION ALL
    SELECT '2025/2026', 'FC Barcelona Third GK 25-26', 95.00, 20, 'Áo thủ môn mẫu thứ 3 màu đen xám.', 'third_gk', 'FC Barcelona' UNION ALL

    SELECT '2025/2026', 'Real Madrid Home 25-26', 105.00, 200, 'Màu trắng hoàng gia tinh khôi với logo Adidas và ba sọc đặc trưng.', 'home', 'Real Madrid' UNION ALL
    SELECT '2025/2026', 'Real Madrid Away 25-26', 105.00, 120, 'Mẫu áo sân khách màu tím đậm phong cách hiện đại.', 'away', 'Real Madrid' UNION ALL
    SELECT '2025/2026', 'Real Madrid Third 25-26', 115.00, 80, 'Thiết kế thứ 3 màu xám carbon phối họa tiết dệt chìm.', 'third', 'Real Madrid' UNION ALL
    SELECT '2025/2026', 'Real Madrid Home GK 25-26', 100.00, 40, 'Áo thủ môn sân nhà màu cam nổi bật.', 'home_gk', 'Real Madrid' UNION ALL
    SELECT '2025/2026', 'Real Madrid Away GK 25-26', 100.00, 30, 'Áo thủ môn sân khách màu xanh dương nhạt.', 'away_gk', 'Real Madrid' UNION ALL
    SELECT '2025/2026', 'Real Madrid Third GK 25-26', 100.00, 25, 'Áo thủ môn mẫu thứ 3 màu đỏ thẫm.', 'third_gk', 'Real Madrid' UNION ALL

    SELECT '2025/2026', 'Atletico Madrid Home 25-26', 95.00, 100, 'Sọc đỏ trắng nguyên bản cùng logo CLB thêu sắc nét.', 'home', 'Atletico Madrid' UNION ALL
    SELECT '2025/2026', 'Atletico Madrid Away 25-26', 95.00, 70, 'Áo sân khách màu xanh navy phối viền đỏ.', 'away', 'Atletico Madrid' UNION ALL
    SELECT '2025/2026', 'Atletico Madrid Third 25-26', 105.00, 40, 'Mẫu áo thứ 3 phong cách hiện đại từ Nike.', 'third', 'Atletico Madrid' UNION ALL
    SELECT '2025/2026', 'Atletico Madrid Home GK 25-26', 90.00, 25, 'Áo thủ môn sân nhà màu đen phối xanh dương.', 'home_gk', 'Atletico Madrid' UNION ALL
    SELECT '2025/2026', 'Atletico Madrid Away GK 25-26', 90.00, 20, 'Áo thủ môn sân khách màu hồng neon.', 'away_gk', 'Atletico Madrid' UNION ALL
    SELECT '2025/2026', 'Atletico Madrid Third GK 25-26', 90.00, 15, 'Áo thủ môn mẫu thứ 3 màu vàng lục.', 'third_gk', 'Atletico Madrid'
) d
JOIN teams t ON t.name = d.t_name
JOIN seasons s ON s.name = d.s_name;

