const auth = require('../middleware/auth');

const db = require("../models");
const { createMessage } = require('./message');
const likes = db.like
const users = db.users
const messages = db.message

exports.getAllLike = (req, res) => {
  
    likes.findAll()
      .then(data => {res.send(data);
      })
      .catch(error => {res.status(500).send({message:error.message || "get error."});
      });
  };

exports.postLike = (req, res) => {

    const headerAuth = req.headers['authorization'];
    const userId = auth.getUserId(headerAuth);

    const messageId = req.params.messageId;

    if (messageId == null ||userId == null) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    } 
    messages.findOne({
        where: {
            id: messageId
        }
    })
    .then(messageFound => {
        if (messageFound) {
            users.findOne({
                where: {
                    id: userId
                }
            })
            .then(userFound => {
                if(userFound) {
                    likes.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                    .then(userAlreadyLikedFound => {
                        if(!userAlreadyLikedFound) {
                            messageFound.update({
                                likes: messageFound.likes + 1,
                            })
                            .then(() => {
                                const newLike = {
                                    userId: userId,
                                    messageId: messageId,
                                    isLike: LIKED 
                                }
                                likes.create(newLike)
                                .then(data => {res.send(data);
                                })
                                .catch(error => {res.status(500).send({message: "requet invalid"});
                                });
                            })
                            .catch (() => {
                                return res.status(500).json({ 'message': 'pas ok' });
                            })
                        } else {
                            res.status(409).json({ 'error': 'message already liked' });
                        }
                    })
                    .catch(function(error) {
                        return res.status(500).json({ 'error': 'unable to verify is user already liked' });
                    });  
                } else {
                    res.status(404).json({ 'error': 'user not exist' });
                }
            })
            .catch(error => {
                return res.status(500).json({ 'error': 'unable to verify user' });
            }); 
        } else {
            res.status(404).json({ 'error': 'message not exist' });
        }
    }) 
        
    .catch(error => {
        return res.status(500).json({ 'error': 'unable to verify message' });
    });    

};

exports.postDislike = (req, res) => {
  
};