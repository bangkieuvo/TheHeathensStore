USE `The Heathens Store`;

INSERT INTO store_settings(setting_key, setting_value, description) VALUES
('shipping.standard_fee', '5.00', 'Standard shipping fee in USD'),
('shipping.express_fee', '15.00', 'Express shipping fee in USD'),
('shipping.free_threshold', '100.00', 'Order subtotal required for free Standard shipping')
ON DUPLICATE KEY UPDATE
setting_value = VALUES(setting_value),
description = VALUES(description);
