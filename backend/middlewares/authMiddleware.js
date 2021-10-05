const jwt =  require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protectData = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('bearer')
    ) {

        try {
            token = req.headers.authorization.split(' ')[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            res.status(401).send('not autorized, token invalid');
            throw new Error('not autorized, token invalid');
        }
    }

    if (!token) {
        res.status(401).send('Not authorized, No token');
        throw new Error('not autorized, No token');
    }
})

module.exports = { protectData }