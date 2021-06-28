# backend P7-Groupomania #

## Project setup ##

Clone this repo. From within the project folder, run `npm install`.


### Installation ###

The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

Create a .env file at the root of the project.
Add the following lines to your .env file :

    JWT_SECRET=<your secret message>
    PORT=3000
    DB_PASSWORD=<your password>
    DB_HOST=localhost
    DB_USER=<your user name>
    DB_NAME=<your database name>

Create your database.
Uncomment line 21 from app.js file : //db.sequelize.sync();
Run `nodemon server`.
Comment line 21 from app.js file : //db.sequelize.sync();

#### run and reload the server ####

run `nodemon server`

