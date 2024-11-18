const User = require('../models/User');
const { generateToken } = require('../config/auth');

// Kullanıcı kaydı
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        res.status(400).json({ message: 'Kayıt işlemi başarısız', error });
    }
};

// Kullanıcı girişi
exports.authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user),
            });
        } else {
            res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Giriş işlemi başarısız', error });
    }
};
