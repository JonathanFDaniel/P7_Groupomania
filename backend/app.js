const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 

app.use (express.urlencoded ());
app.use (express.json ());

const db = require("./models");

let users = db.users

app.post('/api/user', (req, res) => {
  
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };
  
    users.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  }); 

module.exports = app;