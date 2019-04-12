'use strict';
const redis = {

    clients: {
        foo: {                 // instanceName. See below
          port: 6379,          // Redis port
          host: '127.0.0.1',   // Redis host
          password: 'chenyuxiang123',
          db: 0,
        },
        bar: {
          port: 6379,
          host: '127.0.0.1',
          password: 'chenyuxiang123',
          db: 1,
        },
      }
};
module.exports = redis;
