const express = require('express');
const mongoose = require('mongoose');
const warehouseRoutes = require('./routes/warehouseRoutes');
const productRoutes = require('./routes/productRoutes');
const subWarehouseRoutes = require('./routes/subWarehouseRoutes');
const marketRoutes = require('./routes/marketRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');

const app = express();

require('dotenv').config();

// MongoDB bağlantısı
connectDB();

// Body parser kullanarak gelen isteklerin JSON olarak işlenmesini sağla
app.use(bodyParser.json());

// Rotaları kullanma
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subwarehouses', subWarehouseRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/users', userRoutes); // Kullanıcı rotalarını burada ekledik

// Uygulamanın çalışacağı port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
