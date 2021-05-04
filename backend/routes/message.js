const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

//const multer = require('../middleware/multer-config');

router.post('/new', messageController.createMessage); 
router.get('/', messageController.getAllMessage);
/* router.get('/message/:id', messageController.getMessageById);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.modifyUser);*/
router.delete('/:messageId', messageController.deleteMessage); 

module.exports = router;