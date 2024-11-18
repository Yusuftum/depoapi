const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, );
        console.log('Veri tabanına bağlandı');
    } catch (err) {
        console.error('Veri tabanına bağlanmadı:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
