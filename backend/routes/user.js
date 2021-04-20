const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.post('/signup', userController.signup); 
router.post('/signin', userController.signin); 
 
//router.get('/', userController.getUser);
router.get('/profile', userController.getUserById);
router.put('/profile', userController.modifyUser);
router.delete('/profile', userController.deleteUser); 

module.exports = router;