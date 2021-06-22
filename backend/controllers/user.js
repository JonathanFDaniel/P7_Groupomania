const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const db = require("../models");
const users = db.users;

const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

exports.signup = (req, res) => {

  console.log(req.body);

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };

    if (user.firstname == "" || user.lastname == "" || user.email == "") {
      return res.status(400).send({message: "Missing parameters"});
    }

    if (user.firstname.length >= 13 || user.firstname.length <= 3) {
      return res.status(400).json({ message : 'Wrong firstname (must be length 5 - 12)' });
    }

    if (user.lastname.length >= 13 || user.firstname.length <= 3) {
      return res.status(400).json({ message : 'Wrong lastname (must be length 5 - 12)' });
    }

    if (!EMAIL_REGEX.test(user.email)) {
      return res.status(400).json({ message : 'Email is not valid' });
    }

/*     if (!PASSWORD_REGEX.test(user.password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
    } */

  users.findOne({ where: {email: user.email}})
    
    .then(userFound => {
      if (userFound) {
        return res.status(404).send({ message: "User already created." });
      } 
      
      const hashPassword = bcrypt.hashSync(user.password, 10) 

      const newUser = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password : hashPassword
      } 
    
      users.create(newUser) 
        .then(data => {res.send(data);
        })
        .catch(error => {res.status(500).send({message: "User invalid"});
        });
    })
    .catch(error => {res.status(500).send({message: "Requet invalid"});
    });
};

exports.signin = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (email == "" ||  password == "") {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

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
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
        token: jwt.sign(
          { userId: user.id },
          'JWT_SECRET',
          { expiresIn: '24h'} 
        )
      });

    })
    .catch(error => {
      res.status(500).send({ message: error.message });
    });
};

exports.getUserById = (req, res) => {

  const headerAuth  = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ 'error': 'wrong token' });
  }
  
  users.findByPk(userId)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: "Error" + id
      });
    });
}; 
 
exports.modifyUser = (req, res) => {

  const headerAuth  = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  //const hashPassword = bcrypt.hashSync(req.body.password, 10);

  users.findOne({
    atributes: ['id', 'firstname' , 'lastname', 'email'/* , 'password' */ ],
    where: {id: userId}
    })
    .then((userFound) => {
      if(userFound) {
        console.log(userFound);

        userFound.update({
          firstname: (firstname ? firstname : userFound.firstname),
          lastname: (lastname ? lastname : userFound.lastname),
          email: (email ? email : userFound.email),
          //password: (password ? hashPassword : userFound.password)
        })
        .then(() =>  {
          res.send({ message: "User was updated successfully." }); 
        })
        .catch(err => {
          res.status(500).json({ 'error': 'cannot update user' });
        });
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    })
    .catch(error => {return res.status(500).json({ 'error': 'unable to verify user' });
  });
};

exports.deleteUser = (req, res) => {

  const headerAuth  = req.headers['authorization'];
  const userId = auth.getUserId(headerAuth);

  users.destroy({
    where: { id: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
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