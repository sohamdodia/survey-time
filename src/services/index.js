const Jimp = require('jimp');

const imagePath = __dirname + '/../../public/';

const fetchSurveys = async (db) => {

  const data = await db.surveys.findAll({
    include: [
      {
        model: db.survey_questions
      }
    ]
  });
  return data;
}

const createSurvey = async (db, args) => {
  //Create a survey
  const createdSurvey = await db.surveys.create({
    name: args.name,
    created_by: args.username
  });

  //Append created survey id with questions
  const questions = args.questions.map(q => {
    q.survey_id = createdSurvey.id;
    return q;
  });

  const createdQuestions = await db.survey_questions.bulkCreate(questions);

  return {
    createdSurvey,
    createdQuestions
  }
};

const takeSurvey = async (db, args) => {
  return await db.survey_answers.create(args);
}

const surveyResult = async (db, args) => {
  const data = await db.surveys.findAll({
    where: { id: args.id },
    include: [
      {
        model: db.survey_questions,
        include: [
          {
            model: db.survey_answers
          }
        ]
      }
    ]
  });
  return data;
}

const generateThumbnail = async (url) => {
    const urlResult = await Jimp.read(url)

    //Resize image
    const image = urlResult.resize(50, 50).quality(100);

    //Generate random name for a file
    const fileName = new Date().getTime() + '.' + image.getExtension();

    //Generate path where image will be stored
    const path = imagePath + fileName;

    //Write into the file
    await image.writeAsync(path);

    return fileName;
}

module.exports = {
  fetchSurveys,
  createSurvey,
  takeSurvey,
  surveyResult,
  generateThumbnail
}