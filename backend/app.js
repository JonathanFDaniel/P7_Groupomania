require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

app.use(cors()); 

app.use (express.urlencoded ());
app.use (express.json ());

const db = require("./models");
const Role = db.role;

//db.sequelize.sync();

/* db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    initial();
});   */ 

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

/* function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
} */

module.exports = app;