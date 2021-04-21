const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const db = require("../models");
const messages = db.message
const users = db.users;

exports.createMessage = (req, res,) => {

  const headerAuth  = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

    const message = {
        title: req.body.title,
        content: req.body.content,
    };

    if (message.title == "" || message.content == "") {
      return res.status(400).json({message : 'missing parameters' });
    }

    users.findOne({ where: {id: userId}})

    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const newMessage = {
        title: message.title,
        content: message.content,
        userId: userId 
      } 

      messages.create(newMessage)

      .then(data => {res.send(data);
      })
      .catch(error => {res.status(500).send({message:error.message || "requet invalid"});
      });
    })
    .catch(error => {
      res.status(500).send({ message: error.message });
    });
};

exports.getAllMessage = (req, res) => {
  
  messages.findAll()
    .then(data => {res.send(data);
    })
    .catch(error => {res.status(500).send({message:error.message || "get error."});
    });
};

exports.getMessageById = (req, res) => {

  const id = req.params.id;

  messages.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + id
      });
    });
};

exports.deleteMessage = (req, res) => {

  const headerAuth  = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

  console.log(userId);

  messages.destroy({
    where: { id: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe Message was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Message" 
      });
    });
}; 

 