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







-- run db_setup_tables.sql;
-- run db_setup_nations.sql;
-- run db_setup_leagues.sql;
-- run db_setup_teams.sql;
-- run db_setup_seasons.sql;
-- run db_setup_users.sql;
-- -- run db_setup_products.sql;
-- run data_products.sql;



-- SOURCE db_setup_tables.sql;
-- SOURCE db_setup_nations.sql;
-- SOURCE db_setup_leagues.sql;
-- SOURCE db_setup_teams.sql;
-- SOURCE db_setup_seasons.sql;
-- SOURCE db_setup_users.sql;
-- SOURCE data_products.sql;
@include db_setup_tables.sql
@include db_setup_nations.sql
@include db_setup_leagues.sql
@include db_setup_teams.sql
@include db_setup_seasions.sql
 -- @include db_setup_products
@include data_products.sql
@include data_product_images.sql
@include db_setup_users.sql
@include db_setup_carts.sql
@include db_setup_favorites.sql


