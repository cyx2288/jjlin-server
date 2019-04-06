/**
 * 获取请求参数中间件
 * 可以使用ctx.params获取get或post请求参数
 */

'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async function params(ctx, next) {
    ctx.params = {
      ...ctx.query,
      ...ctx.request.body,
    };
    await next();
  };
};
