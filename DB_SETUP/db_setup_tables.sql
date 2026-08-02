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
    uuid BINARY(16) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    sales_count BIGINT NOT NULL DEFAULT 0,
    description TEXT,
    team_id BIGINT,
    season_id BIGINT,
	jersey_type ENUM('home', 'away', 'third', 'home_gk', 'away_gk', 'third_gk') not null,
	is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE SET NULL,
    FOREIGN KEY (season_id)
        REFERENCES seasons(id)
        ON DELETE SET NULL,
    INDEX idx_products_team_id (team_id),
    INDEX idx_products_season_id (season_id),
    INDEX idx_products_active_created_at (is_active, created_at),
    INDEX idx_products_active_sales_count (is_active, sales_count)
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
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(500) NOT NULL DEFAULT '',
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
    uuid BINARY(16) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    order_status ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')
        NOT NULL DEFAULT 'PENDING',
    payment_status ENUM('UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED')
        NOT NULL DEFAULT 'UNPAID',
    shipping_method ENUM('STANDARD', 'EXPRESS') NOT NULL DEFAULT 'STANDARD',
    payment_method ENUM('COD') NOT NULL DEFAULT 'COD',
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    shipping_fee DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    recipient_name VARCHAR(100) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    shipping_address VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    INDEX idx_orders_user_created_at (user_id, created_at),
    INDEX idx_orders_status (order_status),
    INDEX idx_orders_payment_status (payment_status),

    CONSTRAINT chk_orders_total_amount CHECK (total_amount >= 0),
    CONSTRAINT chk_orders_shipping_fee CHECK (shipping_fee >= 0)
);

CREATE TABLE shipping_addresses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    recipient_name VARCHAR(100) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    address VARCHAR(500) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_shipping_addresses_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    INDEX idx_shipping_addresses_user_default (user_id, is_default)
);


-- ORDER ITEMS
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NULL,
    product_uuid BINARY(16) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity BIGINT NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    line_total DECIMAL(12,2) NOT NULL,

    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL,

    INDEX idx_order_items_order (order_id),
    INDEX idx_order_items_product (product_id),

    CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_order_items_unit_price CHECK (unit_price >= 0),
    CONSTRAINT chk_order_items_line_total CHECK (line_total >= 0)
);
