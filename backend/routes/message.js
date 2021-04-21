const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message')

router.post('/new', messageController.createMessage); 
router.get('/', messageController.getAllMessage);
/* router.get('/message/:id', messageController.getMessageById);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.modifyUser);*/
router.delete('/', messageController.deleteMessage); 

module.exports = router;