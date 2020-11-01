const { Sequelize: DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SurveyAnswers = sequelize.define('survey_answers', {
    survey_id: {
      type: DataTypes.INTEGER
    },
    question_id: {
      type: DataTypes.INTEGER
    },
    answer_given_by: {
      type: DataTypes.STRING
    },
    selected_option_value: {
      type: DataTypes.STRING
    }
  });

  SurveyAnswers.sync();
  return SurveyAnswers;
}