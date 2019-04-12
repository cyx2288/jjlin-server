'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/v1/user/login', controller.user.login);
  router.post('/v1/user/register', controller.user.register);
  router.post('/v1/user/forgetPassword', controller.user.forgetPassword);
};

