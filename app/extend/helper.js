'use strict';

module.exports = {

  errorCode: {

    200: '请求成功', // 客户端向服务器请求数据，服务器返回相关数据
    201: '创建成功', // 客户端向服务器提供数据，服务器创建资源
    202: '请求被接收。但处理尚未完成',
    204: '删除成功', // 客户端告知服务器删除一个资源，服务器移除它
    206: '请求成功。但是只有部分回应',
    400: '请求无效。数据不正确，请重试',
    401: '请求没有权限。缺少API token，无效或者超时',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求失败。请求头部不一致，请重试',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '请求失败。请验证参数',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  },

  // 使用方法：ctx.helper.success({ ctx, code:200, res:'success' })
  success: ({ ctx, code = 200, res = null }) => {
    ctx.status = 200;
    ctx.body = {
      code,
      message: ctx.helper.errorCode[code],
      data: res,
    };
  },

  // 使用方法：ctx.helper.fail({ ctx, code:500, res:'fail' })
  fail: ({ ctx, code = 500, res = null }) => {
    ctx.status = 200;
    ctx.body = {
      code,
      message: ctx.helper.errorCode[code],
      data: {
        error: res,
      },
    };
  },

};

