
'use strict';

const Service = require('egg').Service;


class UserService extends Service {

  createToken(data) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }

  async register(body) {

    // 变量控制返回内容
    let functionResult;

    // 获取用户名和密码
    const { name, password , ip } = body;

    // 验证规则
    const createRule = {
      name: { type: 'email', required: true },
      password: { type: 'string', required: true },
    };

    // 验证
    this.ctx.validate(createRule, { name, password });

    // 查重
    const mySqlFinder = await this.ctx.model.ZzUsers.findOne({ 
      
      where: {name} ,

      attributes: ['id']
    
    });
    
    // 如果没有找到，说明没有重复
    if(mySqlFinder == null){

      // 创建新纪录
      await this.ctx.model.ZzUsers.create({ name, password , ip });

      // 返回1说明创建成功
      functionResult = 1;

    }

     else{

      // 返回0说明创建失败，已有重复用户名
      functionResult = 0;

     }

     //  返回
    return { functionResult };

  }

  async login(body){

        // 变量控制返回内容
    let functionResult;

    //返回的值
    let res = null;

    const { name, password } = body;


    // 验证规则
    const createRule = {
      name: { type: 'email', required: true },
      password: { type: 'string', required: true },
    };

    // 验证
    this.ctx.validate(createRule, { name, password });

     // 查重
    const mySqlFinder = await this.ctx.model.ZzUsers.findOne({ 
      
      where: {name , password} ,
      
      attributes: ['id', 'name', 'password']}
      
      );

    //console.log(mySqlFinder);

    if(mySqlFinder != null){

      const token = this.ctx.service.user.createToken({ id: mySqlFinder.dataValues.id });

      let redisResult = await this.app.redis.get('foo').set(mySqlFinder.dataValues.id, token);

      if(redisResult == 'OK'){

        res = token;

        functionResult = 0 ;

      }

      else{

        functionResult = 2 ;

      }


    }

    else{

      functionResult = 1 ;//登录错误

    }


    return { functionResult , res }

  }

  async forgetPassword(body){

    console.log(body);



  }


}

module.exports = UserService;
