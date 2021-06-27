const jwt = require('jsonwebtoken');

const db = require("../models");
const users = db.users;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.userId;

        users.findOne({ where: { id: userId }}) 
            .then(data => {
                if (data.dataValues.isAdmin == true) {
                    next()
                } else {
                    throw 'User Id non valable !';
                }
            })
            .catch (error => {
                console.log('####admin')
                return res.status(500).json({ 'error': 'cannot find user' });
            }) 
    } catch (error) {
        res.status(401).json({ 'error': 'unauthorized command ! '});
    }
}