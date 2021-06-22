const auth = require('../middleware/auth');

const db = require("../models");
const comments = db.comment
const users = db.users

exports.postComment = (req, res) => {

  const headerAuth = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

  const messageId = req.params.messageId;
 
    const comment = {
        content: req.body.content,
    };

    if (comment.content == "") {
        return res.status(400).json({message : 'missing parameters' });
    }

    const user= users.findOne({ where: {id: userId}})

    .then(user => {
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }

    const newComment = {
        content: comment.content,
        userComment: user.firstname,
        userId: userId,
        messageId: messageId 
      } 
  
    comments.create(newComment)
      .then(data => {res.send(data);
      })
      .catch(error => {res.status(500).send({message: "requet invalid"});
      });
    })
    .catch(error => {
      res.status(500).send({ message: error.message });
    });
};

exports.getAllComment = (req, res) => {
  
  comments.findAll()
    .then(data => {res.send(data);
    })
    .catch(error => {res.status(500).send({message:error.message || "get error."});
    });
};

exports.deleteComment = (req, res) => {

  const headerAuth  = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

  const messageId = req.params.messageId;
  const commentId = req.params.commentId;
  
  comments.destroy({
    where: { id: commentId, userId: userId, messageId: messageId }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Comment was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete user with id=${id}. Maybe Comment was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Comment" 
    });
  });;
};