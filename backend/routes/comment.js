const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment')

router.post('/:messageId', commentController.postComment); 
router.get('/', commentController.getAllComment);
router.delete('/:messageId/:commentId', commentController.deleteComment);

module.exports = router;