'use strict';
module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const ZzUsers = app.model.define('zz_users', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    ip:{
      type: STRING,
      allowNull: false,
    }

  });
  return ZzUsers;
};
