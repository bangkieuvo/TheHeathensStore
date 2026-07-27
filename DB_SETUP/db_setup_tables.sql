USE `The Heathens Store`;
-- NATIONS
CREATE TABLE nations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(3) UNIQUE
);
-- LEAGUES
CREATE TABLE leagues (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nation_id bigint null,
    name VARCHAR(255) NOT NULL unique,
    foreign key (nation_id) references nations(id)
);

-- TEAMS
CREATE TABLE teams (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    team_type ENUM('club', 'national','special','custom') NOT NULL,
    league_id bigint,
    foreign key (league_id) references leagues(id)
);


-- SEASONS
CREATE TABLE seasons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);





-- PRODUCTS
CREATE TABLE products (
   	id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid BINARY(16) NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    team_id BIGINT,
    season_id BIGINT,
	jersey_type ENUM('home', 'away', 'third', 'home_gk', 'away_gk', 'third_gk') not null,
	is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE SET NULL,
    FOREIGN KEY (season_id)
        REFERENCES seasons(id)
        ON DELETE SET NULL,
    INDEX idx_products_team_id (team_id),
    INDEX idx_products_season_id (season_id)
);

-- product images
CREATE TABLE product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_thumbnail BOOLEAN DEFAULT FALSE, 
    UNIQUE INDEX idx_unique_thumbnail (product_id, (CASE WHEN is_thumbnail THEN 1 END)),
    FOREIGN KEY (product_id) 
        REFERENCES products(id) 
        ON DELETE CASCADE,
    INDEX idx_images_product (product_id)
);

-- USERS
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    uuid BINARY(16) NOT NULL UNIQUE,      -- Đã tối ưu từ VARCHAR(36) thành BINARY(16)
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- USER INFO
CREATE TABLE user_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id)
       REFERENCES users(id)
       ON DELETE CASCADE
);
-- staff
CREATE TABLE staffs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    employee_code VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- admin
CREATE TABLE admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE,       
    CONSTRAINT fk_admin_user 
        FOREIGN KEY (user_id) REFERENCES users(id) 
        ON DELETE set null
);



-- CART
CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity BIGINT NOT NULL DEFAULT 1,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    UNIQUE (user_id, product_id),

    INDEX idx_cart_user (user_id),
    INDEX idx_cart_product (product_id),

    CHECK (quantity > 0)
);


-- Favorite
CREATE TABLE favorite_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    UNIQUE (user_id, product_id),

    INDEX idx_wishlist_user (user_id),
    INDEX idx_wishlist_product (product_id)
);


-- ORDERS
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    is_paid BOOLEAN NOT NULL DEFAULT FALSE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_orders_user (user_id)
);


-- ORDER ITEMS
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT,

    INDEX idx_order_items_order (order_id),
    INDEX idx_order_items_product (product_id),

    CHECK (quantity > 0),
    CHECK (price >= 0)
);