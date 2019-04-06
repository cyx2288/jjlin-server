'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/v1/users', controller.user.find);
  router.post('/v1/users', controller.user.add);
};
