const db = require("../models");

const users = db.users;
const messages = db.message;
const comments = db.comment;

exports.alertmessage = (req, res) => {

    const userId = parseInt(req.params.userId);
    const messageId = parseInt(req.params.messageId);
    const type = parseInt(req.params.type);
    const commentId = parseInt(req.params.commentId);
 
    if (messageId == null ||userId == null) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    } 

    messages.findOne({ where: { id: messageId }})
    .then(messageFound => {
        if (messageFound) {
            
            if(type == 1) {
                messageFound.update({ alert : messageFound.alert = !messageFound.alert })
                    .then(data => {
                        res.send(data);
                    })
                    .catch (error => {
                        return res.status(500).json({ 'error': 'cannot update message alert boolean' });
                    }) 
            } else {
                comments.findOne({ where: { id: commentId, messageId: messageId }})
                    .then(commentFound => {
                        if(commentFound) {
                            commentFound.update({ alert : commentFound.alert = !commentFound.alert })
                            .then(data => {
                                res.send(data);
                            })
                            .catch (error => {
                                return res.status(500).json({ 'error': 'cannot update message alert boolean' });
                            })
                        }
                    })
                    .catch(error => {
                        return res.status(500).json({ 'error': 'unable to verify comment' });
                    });
            }
        } else {
            res.status(404).json({ 'error': 'message not exist' });
        }
    })        
    .catch(error => {
        return res.status(500).json({ 'error': 'unable to verify message' });
    });    
};