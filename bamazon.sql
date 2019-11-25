-- Drops the database if it already exists remove comments from next line--
DROP DATABASE IF EXISTS bamazon;
-- Create a database--
CREATE DATABASE bamazon;

-- Use programming db for the following statements --
USE bamazon;

CREATE TABLE products(
  
item_id INTEGER NOT NULL AUTO_INCREMENT,
 
product_name VARCHAR(255) NOT NULL,
department VARCHAR(255) NOT NULL,
sub_department VARCHAR(255),
cost INTEGER,
price INTEGER NOT NULL,
stock_qty INTEGER NOT NULL,
stock_safety INTEGER,
image VARCHAR(255),

  -- Set the id as this table's primary key
PRIMARY KEY (item_id)
);

-- Create new example rows

INSERT INTO products ( product_name, department, sub_department, cost, price, stock_qty, stock_safety, image)
VALUES ("bambam","electronics", "smart speaker", 25.34, 119.00, 2000, 500, "bambam.jpg"),
("bambamdeluxe","electronics", "smart speaker", 39.36, 319.00, 2000, 500, "bambamdeluxe.jpg"),
("flamingo lawn ornament","gardening", "decorations", 5.03, 34.00, 20000, 1000, "flamingo.jpg"),
("Rugged Speaker","electronics", "bluetooth speaker", 12.74, 134.00, 3500, 500, "bluetooth.jpg"),
("vinyl stickers","electronics", "decorations", 0.38, 5.60, 2000, 500, "stickers.jpg"),
("Ginsu Kniife","kitchen", "utensils", 4.37, 39.99, 600, 200, "ginsu.jpg"),
("spiralizer","kitchen", "utensils", 2.54, 19.00, 1000, 500, "spiral.jpg"),
("Queezynart","kitchen", "applaince", 35.49, 129.00, 2000, 500, "queezy.jpg"),
("baby shark plush","childrens", "stuffed animals", 3.65, 14.99, 2000, 500, "babyshark.jpg"),
("moon cheese","food", "snacks", 1.64, 6.00, 2000, 500, "mooncheese.jpg");

