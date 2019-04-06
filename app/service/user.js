/*
 * @Descripttion:
 * @version:
 * @Author: chenyuxiang
 * @LastEditors: chenyuxiang
 * @Date: 2019-03-28 23:19:45
 * @LastEditTime: 2019-04-04 17:41:10
 */
'use strict';

const Service = require('egg').Service;


class UserService extends Service {


  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.model.ZzUsers.find({ id: uid });
    return { user };
  }

  createToken(data) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }

  verifyToken(token) {
    const result = {};
    this.app.jwt.verify(token, this.app.config.jwt.secret, function(err, decoded) {

      if (err) {
        /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
        result.verify = false;
        result.message = err.message;
      } else {
        result.verify = true;
        result.message = decoded;
      }

    });
    return result;
  }


  async add(body) {
    const { name, password } = body;

    const createRule = {
      name: { type: 'email', required: true },
      password: { type: 'string', required: true },
    };

    this.ctx.validate(createRule, body);

    await this.ctx.model.ZzUsers.create({ name, password })
      .then(() => this.ctx.model.ZzUsers.findOrCreate({ where: { name }, defaults: { password: '0000' } }))
      .spread((user, created) => {
        console.log(
          user.get({
            plain: true,
          })
        );
        console.log(created);

        const token = this.ctx.service.user.createToken({ id: user.id });

        console.log(token);

        const result = this.ctx.service.user.verifyToken(token);

        console.log(result);

      /*
      在这个例子中，findOrCreate 返回一个如下的数组：
      [ {
          username: 'fnord',
          job: 'omnomnom',
          id: 2,
          createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
          updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
        },
        false
      ]
      由findOrCreate返回的数组通过 ".spread" 扩展为两部分，并且这些部分将作为2个参数传递给回调函数，在这种情况下将其视为 "user" 和 "created" 。（所以“user”将是返回数组的索引0的对象，并且 "created" 将等于 "false"。）
      */
      });

    const insertSuccess = 1;

    return { insertSuccess };
  }


}

module.exports = UserService;
