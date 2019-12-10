const express = require('express');

const moneyRouter = require('./money/moneyRouter')

const server = express();

server.use(express.json());

server.use('/api/money' , moneyRouter)

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex</h3>');
  });

module.exports = server;