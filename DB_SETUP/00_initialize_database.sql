DROP SCHEMA IF EXISTS `The Heathens Store`;
CREATE SCHEMA IF NOT EXISTS `The Heathens Store`;
USE `The Heathens Store`;
-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS cart_items;
-- DROP TABLE IF EXISTS wishlist_items;	
-- DROP TABLE IF EXISTS order_items;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS user_info;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS seasons;
-- DROP TABLE IF EXISTS leagues;
-- DROP TABLE IF EXISTS teams;
-- DROP TABLE IF EXISTS nations;
-- drop table if Exists product_images;
-- SET FOREIGN_KEY_CHECKS = 1;

-- run 01_create_tables.sql;
-- run 02_data_nations.sql;
-- run 03_data_leagues.sql;
-- run 04_data_teams.sql;
-- run 05_data_seasons.sql;
-- run 06_data_users.sql;
-- run 07_data_products.sql;
-- run 08_data_product_images.sql;
-- run 09_data_cart_items.sql;
-- run 10_data_favorite_items.sql;



-- SOURCE 01_create_tables.sql;
-- SOURCE 02_data_nations.sql;
-- SOURCE 03_data_leagues.sql;
-- SOURCE 04_data_teams.sql;
-- SOURCE 05_data_seasons.sql;
-- SOURCE 06_data_users.sql;
-- SOURCE 07_data_products.sql;
-- SOURCE 08_data_product_images.sql;
-- SOURCE 09_data_cart_items.sql;
-- SOURCE 10_data_favorite_items.sql;

@include 01_create_tables.sql
@include 02_data_nations.sql
@include 03_data_leagues.sql
@include 04_data_teams.sql
@include 05_data_seasons.sql
@include 06_data_users.sql
@include 07_data_products.sql
@include 08_data_product_images.sql
@include 09_data_cart_items.sql
@include 10_data_favorite_items.sql


