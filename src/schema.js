const Joi = require('joi');

exports.authenticate = Joi.object({
  username: Joi
    .string()
    .required()
    .label('Username'),
  password: Joi
    .string()
    .required()
    .label('Password')
});

exports.generateThumbnail = Joi.object({
  url: Joi
    .string()
    .required()
    .label('URL')
});

exports.createSurvey = Joi.object({
  name: Joi
    .string()
    .required()
    .label('Name'),
  questions: Joi.array().items(
    Joi.object({
      question: Joi.string().required()
    })
  )
    .required()
    .min(1)
    .label('Questions')
});

exports.takeSurvey = Joi.object({
  survey_id: Joi
    .number()
    .integer()
    .required()
    .label('Survey Id'),
  question_id: Joi
    .number()
    .integer()
    .required()
    .label('Question Id'),
  selected_option_value: Joi
    .string()
    .valid('yes', 'no')
    .required()
    .label('Selected Option')  
});


exports.surveyResult = Joi.object({
  id: Joi
    .number()
    .integer()
    .required()
    .label('Survey Id')
});