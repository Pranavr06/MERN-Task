const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve frontend static files (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname)));

// In-memory JavaScript array storing products
let products = [
  { id: 1, name: 'Book', price: 250 },
  { id: 2, name: 'Pen', price: 25 }
];

// Helper to generate next unique ID
let nextId = 3;

// ================= REST API ENDPOINTS ================= //

// 1. READ ALL - GET /api/products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// 2. CREATE - POST /api/products
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;

  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required.' });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: 'Valid positive price is required.' });
  }

  const newProduct = {
    id: nextId++,
    name: name.trim(),
    price: numericPrice
  };

  products.push(newProduct);
  res.status(201).json({
    message: 'Product added successfully!',
    product: newProduct
  });
});

// 3. UPDATE - PUT /api/products/:id
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { name, price } = req.body;

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required.' });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: 'Valid positive price is required.' });
  }

  products[productIndex].name = name.trim();
  products[productIndex].price = numericPrice;

  res.status(200).json({
    message: 'Product updated successfully!',
    product: products[productIndex]
  });
});

// 4. DELETE - DELETE /api/products/:id
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const removedProduct = products.splice(productIndex, 1)[0];
  res.status(200).json({
    message: 'Product deleted successfully!',
    product: removedProduct
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`CRUD Server is running on http://localhost:${PORT}`);
});
