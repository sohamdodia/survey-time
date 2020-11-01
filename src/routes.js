const express = require('express');
const utils = require('./utils');
const controller = require('./controllers');

const router = express.Router();

//Generate JWT token
router.post('/authenticate', controller.authenticate);

// Fetch all the surveys with questions
router.get('/survey/fetch', utils.validateAuthorization, controller.fetchSurveys);

//Create a new survey
router.post('/survey/create', utils.validateAuthorization, controller.createSurvey);

//Take a survey
router.post('/survey/take', utils.validateAuthorization, controller.takeSurvey);

//Fetch result for one particular survey
router.get('/survey/result/:id', utils.validateAuthorization, controller.surveyResult);

//Generate Thumbnail image of a public url
router.post('/image-thumbnail', controller.generateThumbnail);

module.exports = router;
