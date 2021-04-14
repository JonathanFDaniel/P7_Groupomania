const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");
const user = db.users
const comments = db.comment

exports.postComment = (req, res,) => {

    const comment = {
        content: req.body.content,
    };
  
    comments.create(comment)
      .then(data => {res.send(data);
      })
      .catch(error => {res.status(500).send({message: "requet invalid"});
      });
};
 