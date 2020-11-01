const { Sequelize: DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Survey = sequelize.define('surveys', {
    name: {
      type: DataTypes.STRING
    },
    created_by: {
      type: DataTypes.STRING
    }
  });
  Survey.sync();
  return Survey;
}