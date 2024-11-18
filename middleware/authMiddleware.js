const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../config/auth');

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Yetkisiz, token doğrulaması başarısız' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Yetkisiz, token eksik' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Yetkisiz, admin rolü gerekli' });
    }
};

module.exports = { protect, admin };
