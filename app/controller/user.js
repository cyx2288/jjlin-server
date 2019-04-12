'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {

  async register() {
    const { ctx } = this;

    const body = {
      
      ...ctx.params,
      
    };

    const result = await ctx.service.user.register(body);
    //ctx.body = result;

    if (result.functionResult){

      ctx.helper.success({ ctx, code: 200, res: 'success' });

    }

    else {

      ctx.helper.success({ ctx, code: 200, res: '用户已存在' });

    }

  }

  async login() {

    const { ctx } = this;

    const body = {  
      
    ...ctx.params,
    
    };

    const result = await ctx.service.user.login(body);

    if (result.functionResult == 0){

      ctx.helper.success({ ctx, code: 200, 

        res: {'Bearer' : result.res} 

      });

    }

    else if(result.functionResult == 1) {

      ctx.helper.success({ ctx, code: 200, res: '登录错误' });

    }

    else{

      ctx.helper.success({ ctx, code: 200, res: '缓存错误' });

    }
    

  }

  async forgetPassword(){

    const { ctx } = this;

    const body = {  
      
    ...ctx.params,
    
    };

    const result = await ctx.service.user.forgetPassword(body);


  }

}

module.exports = UserController;
