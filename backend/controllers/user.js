const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");
const users = db.users

exports.signup = (req, res) => {

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    };
  
    users.create(user)
      .then(data => {res.send(data);
      })
      .catch(error => {res.status(500).send({message: "requet invalid"});
      });
};

exports.signin = (req, res) => {

  users.findOne({ where: {email: req.body.email}})
  
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync( req.body.password, user.password );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          { userId: user._id },
          'RAMDOM_TOKEN_SECRET',
          { expiresIn: '24h'}
        )
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUser = (req, res) => {
  
    users.findAll()
      .then(data => {res.send(data);
      })
      .catch(err => {res.status(500).send({message:err.message || "get error."});
      });
  };

exports.getUserById = (req, res) => {
    const id = req.params.id;
  
    users.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error " + id
        });
      });
  };

exports.modifyUser = (req, res) => {
    const id = req.params.id;
  
    users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };

  exports.deleteUser = (req, res) => {
    const id = req.params.id;
  
    users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
  };