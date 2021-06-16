const http = require('http');
const { routes } = require('./app');
const app =require('./app');

console.log(process.env.PORT);

app.set('port', process.env.PORT || 3000)
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);