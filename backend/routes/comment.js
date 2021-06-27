const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentController = require('../controllers/comment')

router.post('/:userId/:messageId', auth, commentController.postComment); 
router.get('/', auth, commentController.getAllComment);
router.delete('/:userId/:messageId/:commentId', auth, commentController.deleteComment);
router.delete('/adminDeleteComment/:userId/:messageId/:commentId', auth, commentController.deleteComment);

module.exports = router;