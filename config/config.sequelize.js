'use strict';
const equelize = {


  datasources: [

    {

      dialect: 'mysql',// 数据库类型

      delegate: 'model', // load all models to app.model and ctx.model

      baseDir: 'model', // load models from `app/model/*.js`

      replication: {
        //读写分离
        read: [

          { host: '127.0.0.1', username: 'root', password: 'chenyuxiang123', port: '3306', database: 'egg-sequelize-doc-default', },

          { host: '127.0.0.1', username: 'root', password: 'chenyuxiang123', port: '3306', database: 'egg-sequelize-doc-default', }

        ],

        write: { host: '127.0.0.1', username: 'root', password: 'chenyuxiang123', port: '3306', database: 'egg-sequelize-doc-default', }

      },

      timezone: '+08:00',

    }



  ]



};
module.exports = equelize;
