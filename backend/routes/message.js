const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('../middleware/multer-config');

const messageController = require('../controllers/message');

router.post('/new/:userId', auth, multer, messageController.createMessage);
router.get('/', auth, messageController.getAllMessage);
router.delete('/:messageId', auth, messageController.deleteMessage); 
router.delete('/adminDeleteMessage/:messageId', admin, messageController.deleteMessage); 

module.exports = router;