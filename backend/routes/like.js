const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like')

router.post('/:messageId/likeMessage', likeController.postLike); 

module.exports = router;