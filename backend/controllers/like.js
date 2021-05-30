const auth = require('../middleware/auth');

const db = require("../models");

const likes = db.like;
const users = db.users;
const messages = db.message;

exports.postLike = (req, res) => {

    const headerAuth = req.headers['authorization'];
    const userId = auth.getUserId(headerAuth);
    console.log(userId);

    const messageId = parseInt(req.params.messageId);

    if (messageId == null ||userId == null) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    } 

    messages.findOne({
        where: { id: messageId }
    })
    .then(messageFound => {
        if (messageFound) {
            users.findOne({ where: { id: userId }
        })
            .then(userFound => {
                if(userFound) {
                    likes.findOne({
                        where: { userId: userId, messageId: messageId }
                    })
                    .then(userAlreadyLikedFound => {
                        if(!userAlreadyLikedFound) {

                            const newLike = {
                                userId: userId,
                                messageId: messageId,
                                isLike: 1 
                            }
                            likes.create(newLike)
                            .then(() => {
                                 messageFound.update({
                                    likes: messageFound.likes +1,
                                }) 
                                .then(data => {
                                    res.send(data);
                                })
                                .catch (error => {
                                    return res.status(500).json({ 'error': 'cannot update message like counter' });
                                }) 
                            }) 
                            .catch(error => {
                                res.status(500).send({ 'error': 'unable to set user reaction' });
                            }); 

                        } else {

                            likes.destroy({
                                where: { id: userAlreadyLikedFound.id }
                            })
                            .then(() => {
                                if (messageFound.likes > 1) {
                                    messageFound.update({
                                        likes: messageFound.likes -1,
                                    }) 
                                    .then(() => {
                                        res.status(200).send({ message: "Message was deleted successfully!" }); 
                                    })
                                    .catch(error => {
                                        res.status(500).send({ 'error': 'cannot update message like counter' });
                                    });
                                }
                                messageFound.update({
                                    likes: null,
                                }) 
                                .then(() => {
                                    res.status(200).send({ message: "Message was deleted successfully!" }); 
                                })
                                .catch(error => {
                                    res.status(500).send({ 'error': "Could not delete Message" });
                                });

                            }) 
                            .catch(error => {
                                res.status(500).send({ 'error': "Could not delete Message" });
                            });    
                        }
                    })
                    .catch(error => {
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