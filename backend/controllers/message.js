const auth = require('../middleware/auth');
const fs = require('fs');

const db = require("../models");
const messages = db.message
const users = db.users;
const islikes = db.like;
const comments = db.comment;

exports.createMessage = (req, res,) => {

  const headerAuth = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

    const message = {
        title: req.body.title,
        content: req.body.content
    };

    if ( req.file && req.file.filename) {
      message.attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

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
        attachement: message.attachement,
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
  
  messages.findAll({
    include: [{
      model: users, as: "user",
      attributes: [ 'firstname', 'lastname' ]
    },{
      model: comments, as: "comment",
      attributes: [ 'id', 'content', 'userComment' ]
    }],
    order:[
      ["id","DESC"]
    ],
    limit: 10,
  })
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

  const messageId = req.params.messageId;
  console.log('ok', messageId, 'ok')
  messages.findOne({where :{ id: messageId }})
  .then(message => {
    if(message.attachement) {
      const filename = message.attachement.split('/images/')[1];
      console.log('ok', filename, 'ok');
      fs.unlink(`images/${filename}`, () => {
        messages.destroy({
          where: { id: messageId }
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
      });
    } else {
      messages.destroy({
        where: { id: messageId }
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
    }
  })
  .catch(error => res.status(500).json({ error }));
  
  /* const headerAuth  = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

  const messageId = req.params.messageId;

  messages.destroy({
    where: { id: messageId }
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
    });  */
}; 

 