const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const alertController = require('../controllers/alert')

router.post('/:userId/:messageId/:type/:commentId', auth, admin, alertController.alertmessage);  

module.exports = router;