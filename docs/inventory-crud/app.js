const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password', // replace with your MySQL password
  database: 'InventoryDB'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// --- CRUD for Products ---
app.get('/products', (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/products/:id', (req, res) => {
  db.query('SELECT * FROM Products WHERE product_id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/products', (req, res) => {
  const { name, description, price, quantity } = req.body;
  db.query('INSERT INTO Products SET ?', { name, description, price, quantity }, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Product added', productId: result.insertId });
  });
});

app.put('/products/:id', (req, res) => {
  const { name, description, price, quantity } = req.body;
  db.query('UPDATE Products SET ? WHERE product_id = ?', [{ name, description, price, quantity }, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Product updated' });
  });
});

app.delete('/products/:id', (req, res) => {
  db.query('DELETE FROM Products WHERE product_id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Product deleted' });
  });
});

// --- CRUD for Orders ---
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM Orders', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/orders/:id', (req, res) => {
  db.query('SELECT * FROM Orders WHERE order_id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/orders', (req, res) => {
  const { product_id, quantity } = req.body;
  db.query('INSERT INTO Orders SET ?', { product_id, quantity }, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Order placed', orderId: result.insertId });
  });
});

app.put('/orders/:id', (req, res) => {
  const { product_id, quantity } = req.body;
  db.query('UPDATE Orders SET ? WHERE order_id = ?', [{ product_id, quantity }, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Order updated' });
  });
});

app.delete('/orders/:id', (req, res) => {
  db.query('DELETE FROM Orders WHERE order_id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Order deleted' });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
