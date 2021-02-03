'use strict';

const server = require('../shopping-server/server'),
    config = require('../shopping-server/config/config');

server.listen(process.env.port || config.server.port);

console.log('Shopping Portal app started at :', process.env.port || config.server.port); 