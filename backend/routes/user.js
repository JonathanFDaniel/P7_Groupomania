const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const userController = require('../controllers/user')

router.post('/signup', userController.signup); 
router.post('/signin', userController.signin); 
 
router.get('/users', auth, admin, userController.getAllUsers);
router.put('/profile/:userId', auth, userController.modifyUser);
router.delete('/profile/:userId', auth, userController.deleteUser); 

module.exports = router;