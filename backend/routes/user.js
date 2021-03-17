const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.post('/', userController.createUser); 
router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;