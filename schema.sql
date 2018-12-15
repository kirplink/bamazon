CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES 
    ("gtx 1080ti", "electronics", 1200, 26),
    ("amd ryzen 2600", "electronics", 250, 17),
    ("3-in-one oil", "tools", 5, 103),
    ("ifix it kit", "tools", 35, 58),
    ("triple paste 16oz", "baby", 30, 205),
    ("taboo", "games", 20, 54),
    ("hidden monsters", "books", 12, 6);

SELECT * FROM products;