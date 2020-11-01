const db = require('../db');
const schema = require('../schema');
const utils = require('../utils');
const services = require('../services');



const authenticate = async (req, res) => {
  try {
    const validationResult = schema.authenticate.validate(req.body)

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }
    const token = utils.generateToken(req.body.username);
    return res.status(200).send(utils.getSuccessMessage({ token }));
  } catch (error) {
    console.log(error)
    return res.status(500).send(utils.getErrorMessage());
  } 
};

const fetchSurveys = async (req, res) => {
  try {

    const data = await services.fetchSurveys(db);

    return res.status(200).send(utils.getSuccessMessage(data));
  } catch (error) {
    console.log(error)
    return res.status(500).send(utils.getErrorMessage());
  }
};

const createSurvey = async (req, res) => {
  try {
    const validationResult = schema.createSurvey.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }
    const args = req.body;
    args.username = req.username;

    const { createdSurvey, createdQuestions } = await services.createSurvey(db, args);

    return res.status(200).send(utils.getSuccessMessage({ survey: createdSurvey, questions: createdQuestions }));
  } catch (error) {
    console.log(error)
    return res.status(500).send(utils.getErrorMessage());
  }
};

const takeSurvey = async (req, res) => {
  try {
    const validationResult = schema.takeSurvey.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const args = req.body;
    args.answer_given_by = req.username;
    await services.takeSurvey(db, args);
    return res.status(200).send(utils.getSuccessMessage());
  } catch (error) {
    console.log(error)
    return res.status(500).send(utils.getErrorMessage());
  }
};

const surveyResult = async (req, res) => {
  try {
    const validationResult = schema.surveyResult.validate(req.params);

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const data = await services.surveyResult(db, req.params);

    return res.status(200).send(utils.getSuccessMessage(data));
  } catch (error) {
    console.log(error)
    return res.status(500).send(utils.getErrorMessage());
  }
};

const generateThumbnail = async (req, res) => {
  try {
    const validationResult = schema.generateThumbnail.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const fileName = await services.generateThumbnail(req.body.url);

    return res.status(200).send(utils.getSuccessMessage({ filePath: `${utils.getFullUrl(req)}/${fileName}` }));
  } catch (error) {
    console.log(error)
    return res.status(500).send(utils.getErrorMessage());
  }
}

module.exports = {
  authenticate,
  fetchSurveys,
  createSurvey,
  takeSurvey,
  surveyResult,
  generateThumbnail
}
