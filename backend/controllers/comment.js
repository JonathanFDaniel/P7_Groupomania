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

    users.findOne({ where: {id: userId}})

    .then(user => {
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }

    const newComment = {
        content: comment.content,
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
 