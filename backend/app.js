const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');

app.use(cors()); 

app.use (express.urlencoded ());
app.use (express.json ());

/* const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  }); */

app.use('/api/user', userRoutes);


module.exports = app;