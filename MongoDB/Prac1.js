const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// ===============================
// 1️⃣ MongoDB Connection
// ===============================
mongoose.connect('mongodb://127.0.0.1:27017/productDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ===============================
// 2️⃣ Schema & Model Definition
// ===============================
const VariantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  variants: [VariantSchema]
});

const Product = mongoose.model('Product', ProductSchema);

// ===============================
// 3️⃣ Routes
// ===============================

// Serve index.html for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Simple ping route for testing
app.get('/ping', (req, res) => {
  res.send('pong');
});

// ➕ CREATE: Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📄 READ: Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE: Update product by ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ DELETE: Remove product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 4️⃣ Start the Server
// ===============================
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

