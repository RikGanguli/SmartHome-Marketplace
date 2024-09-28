create database exampledatabase;

use exampledatabase;

create table Registration(username varchar(40),password varchar(40),repassword varchar(40),
usertype varchar(40));


Create table CustomerOrders
(
OrderId integer,
userName varchar(40),
orderName varchar(40),
orderPrice double,
userAddress varchar(40),
creditCardNo varchar(40),
Primary key(OrderId,userName,orderName)
);

Create table Productdetails
(
ProductType varchar(20),
Id varchar(20),
productName varchar(100),
productPrice double,
productImage varchar(40),
productManufacturer varchar(40),
productCondition varchar(40),
productDiscount double,
productDescription varchar(1000),
Primary key(Id)
);

-- CREATE TABLE Product_accessories (
--     productName varchar(20),
--     accessoriesName  varchar(20),
--     
--     
--     FOREIGN KEY (productName) REFERENCES Productdetails(Id) ON DELETE SET NULL
--         ON UPDATE CASCADE,
--     FOREIGN KEY (accessoriesName) REFERENCES Productdetails(Id) ON DELETE SET NULL
--         ON UPDATE CASCADE    
-- );

show tables;

-- drop table Productdetails;
-- drop table Product_accessories;
-- delete from Productdetails;

-- Alter table ProductDetails add productOnSale integer;
-- Alter table ProductDetails add productQuantity integer;
-- Alter table ProductDetails add manufacturerRebate integer;
-- Alter table CustomerOrders drop column dayDate;
-- Alter table CustomerOrders add dayDate VARCHAR(10);




select * from Productdetails;
select * from registration;
select * from CustomerOrders;

delete from registration where username = "rik";
delete from CustomerOrders where OrderID = 13;

insert into customerorders values(13, 'c4', 'fajf', 44.44, 'efefeaf', 'gergfer', '08/03/2000');

