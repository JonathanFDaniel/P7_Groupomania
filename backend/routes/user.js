const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.post('/signup', userController.signup); 
router.post('/signin', userController.signin); 

router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;