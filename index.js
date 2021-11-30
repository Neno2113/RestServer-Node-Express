require('dotenv').config();
const { dbConnection } = require('./database/config');
const Server = require('./models/Server');

const server = new Server();

//Database
dbConnection();


server.listen();