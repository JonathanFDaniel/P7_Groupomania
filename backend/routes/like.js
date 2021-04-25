const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like')

router.get('/', likeController.getAllLike);
router.post('/likeMessage/:messageId', likeController.postLike); 
router.post('/dislikeMessage/:messageId', likeController.postDislike);

module.exports = router;