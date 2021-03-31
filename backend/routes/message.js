const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message')

router.post('/message', messageController.postMessage); 
router.get('/message', messageController.getAllMessage);
router.get('/message/:id', messageController.getMessageById);
/* router.get('/:id', userController.getUserById);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.deleteUser); */

module.exports = router;