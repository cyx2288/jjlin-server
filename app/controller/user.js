/*
 * @Descripttion:
 * @version:
 * @Author: chenyuxiang
 * @LastEditors: chenyuxiang
 * @Date: 2019-03-28 15:43:59
 * @LastEditTime: 2019-03-31 16:45:02
 */
'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {

  async find() {
    const { ctx } = this;
    const id = ctx.params.id;
    const user = await ctx.service.user.find(id);
    ctx.body = user;
    ctx.helper.success({ ctx, code: 200, res: user });
  }


  async add() {
    const { ctx } = this;
    const body = ctx.params;

    const result = await ctx.service.user.add(body);
    ctx.body = result;
    ctx.helper.success({ ctx, code: 200, res: 'success' });


  }

}

module.exports = UserController;
