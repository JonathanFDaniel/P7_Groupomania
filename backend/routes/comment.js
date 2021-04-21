const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment')

router.post('/new', commentController.postComment); 

module.exports = router;