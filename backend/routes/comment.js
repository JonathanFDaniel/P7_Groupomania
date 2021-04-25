const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment')

router.post('/:messageId', commentController.postComment); 
router.get('/', commentController.getAllComment);

module.exports = router;