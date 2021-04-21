const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');

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

app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/comment', commentRoutes);

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