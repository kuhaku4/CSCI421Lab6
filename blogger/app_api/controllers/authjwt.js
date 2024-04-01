const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = function(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                console.error('Error verifying token:', err);

                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                console.log('Decoded Token Payload:', decoded);

                User.findById(decoded._id)
                    .then(user => {
                        req.user = user; 
                        next(); 
                    })
                    .catch(err => {
                        console.error('Error finding user by ID:', err);

                        return res.status(401).json({ message: 'Unauthorized' });
                    });
            }
        });
    } else {
        console.error('No token found in request');

        return res.status(401).json({ message: 'Unauthorized' });
    }
};