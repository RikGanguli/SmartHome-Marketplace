const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "exampledatabase"
});

// Reconnect to MySQL in case of a fatal error
pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Attempting to reconnect to MySQL...');
        pool.end();
        pool = mysql.createPool({ // Recreate the pool
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            password: "root",
            database: "exampledatabase"
        });
    } else {
        throw err;
    }
});

app.post('/user-registration', (req, res) => {
    const { username, password, confirmPassword, userType } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
    }

    
    const sql = 'INSERT INTO Registration (username, password, repassword, usertype) VALUES (?, ?, ?, ?)';
    const values = [username, password, confirmPassword, userType];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        console.log('User registered:', result);
        return res.status(201).json({ message: 'Registration successful', userId: result.insertId });
    });
});

app.post("/authenticate", async (req, res) => {
    const { username, password, userType } = req.body;

    const sql = "SELECT * FROM Registration WHERE username = ? AND usertype = ?";
    const values = [username, userType];

    try {
        const [rows] = await pool.promise().query(sql, values);

        if (rows.length === 1) {
            const user = rows[0];

            if (password === user.password) {
                // Password is valid, return user data
                res.status(200).json({ username: user.username, userType: user.usertype });
            } else {
                // Invalid password
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            // User not found
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/autocomplete/:query', (req, res) => {
    const searchTerm = req.params.query;

    
    const sql = 'SELECT iD, productName FROM productdetails WHERE productName LIKE ?';
    const values = [`${searchTerm}%`];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        return res.status(200).json(result);
    });
});

app.post('/add-product', (req, res) => {
    const { productType, iD, productName, price, manufacturer, description, image, condition, discount } = req.body;

    
    const sql = 'INSERT INTO productdetails (ProductType, Id, productName, productPrice, productImage, productManufacturer, productCondition, productDiscount, productDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [productType, 27, productName, price, image, manufacturer, condition, discount, description];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        console.log('Product added:', result);
        return res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
});

app.post('/update-product', (req, res) => {
    const {
        productName,
        price,
        manufacturer,
        description,
        image,
        condition,
        discount
    } = req.body;

   
    const sql = 'UPDATE ProductDetails SET productPrice = ?, productManufacturer = ?, productDescription = ?, productImage = ?, productCondition = ?, productDiscount = ? WHERE productName = ?';
    const values = [price, manufacturer, description, image, condition, discount, productName];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        console.log('Product updated:', result);
        return res.status(200).json({ message: 'Product updated successfully' });
    });
});

app.delete('/delete-product/:productName', (req, res) => {
    const productName = req.params.productName;

   
    const sql = 'DELETE FROM ProductDetails WHERE productName = ?';
    const values = [productName];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    });
});

app.get('/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    
    const sql = 'SELECT * FROM CustomerOrders WHERE OrderID = ?';

    pool.query(sql, [orderId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (result.length >= 1) {
            const order = result[0];
            return res.status(200).json({
                orderId: order.OrderID,
                orderName: order.orderName,
                orderPrice: order.orderPrice
            });
        } else {
            return res.status(404).json({ message: 'Order not found' });
        }
    });
});

app.post('/add-order', (req, res) => {
    const { id, userrname, productName, price } = req.body;

    const sql = 'INSERT INTO CustomerOrders (OrderID, userName, orderName, orderPrice) VALUES (?, ?, ?, ?)';
    const values = [id, 's2', productName, price];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        console.log('Order added:', result);
        return res.status(201).json({ message: 'Order added successfully', orderId: result.insertId });
    });
});

app.delete('/delete-order/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    
    const sql = 'DELETE FROM CustomerOrders WHERE OrderID = ?';
    const values = [orderId];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Order not found' });
        }
    });
});

app.post('/user-add', (req, res) => {
    const { userName, password } = req.body;

    
    const sql = 'INSERT INTO Registration (username, password, repassword, usertype) VALUES (?, ?, ?, ?)';
    const values = [userName, password, password, 'customer'];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        console.log('User registered:', result);
        return res.status(201).json({ message: 'Registration successful', userId: result.insertId });
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
