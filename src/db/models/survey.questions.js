const { Sequelize: DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SurveyQuestions = sequelize.define('survey_questions', {
    survey_id: {
      type: DataTypes.INTEGER
    },
    question: {
      type: DataTypes.STRING
    },
  });

  SurveyQuestions.sync();
  return SurveyQuestions;
}