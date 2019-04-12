/* eslint valid-jsdoc: "off" */

'use strict';

const sequelizeConfig = require('./config.sequelize');

const redisConfig = require('./config.redis');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553693321061_3777';

  // add your middleware config here
  config.middleware = [
    'params',
    'errorHandler',

  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  config.sequelize = sequelizeConfig;

  config.redis=redisConfig;

  config.security = {
    csrf: false,
  };

  config.jwt = {
    secret: 'z1z2z3z4z5ZzZz?zz',
  };

  return {
    ...config,
    ...userConfig,
  };
};
