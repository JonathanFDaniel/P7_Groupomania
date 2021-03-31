const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");
const user = db.users
const messages = db.message

exports.postMessage = (req, res,) => {

    const message = {
        title: req.body.title,
        content: req.body.content,
    };
  
    messages.create(message)
      .then(data => {res.send(data);
      })
      .catch(error => {res.status(500).send({message: "requet invalid"});
      });
};

exports.getAllMessage = (req, res) => {
  
    messages.findAll()
      .then(data => {res.send(data);
      })
      .catch(err => {res.status(500).send({message:err.message || "get error."});
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
 