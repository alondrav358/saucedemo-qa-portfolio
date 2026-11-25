-- ============================================================================
-- SauceDemo E-Commerce Backend Data Validation Queries (MySQL)
-- Author: Alondra Valdez
-- Purpose: Validate order totals, inventory updates, and duplicate transactions
-- ============================================================================

-- 1. Verify that order total matches item subtotals plus 8% sales tax
SELECT 
    o.order_id,
    o.user_id,
    o.total_amount AS recorded_total,
    ROUND(SUM(oi.quantity * oi.unit_price) * 1.08, 2) AS expected_total
FROM orders o
INNER JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.user_id, o.total_amount
HAVING recorded_total <> expected_total;

-- 2. Detect potential duplicate customer orders placed within a 5-minute window
SELECT 
    user_id,
    total_amount,
    COUNT(*) AS order_count,
    MIN(created_at) AS first_order_time,
    MAX(created_at) AS last_order_time
FROM orders
WHERE created_at >= NOW() - INTERVAL 1 DAY
GROUP BY user_id, total_amount
HAVING COUNT(*) > 1 
   AND TIMESTAMPDIFF(MINUTE, MIN(created_at), MAX(created_at)) <= 5;

-- 3. Validate that product inventory stock is never negative after checkout
SELECT 
    product_id,
    product_name,
    stock_quantity,
    updated_at
FROM products
WHERE stock_quantity < 0;

-- 4. Identify orphaned order items without a valid parent order record
SELECT 
    oi.order_item_id,
    oi.order_id,
    oi.product_id
FROM order_items oi
LEFT JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_id IS NULL;
