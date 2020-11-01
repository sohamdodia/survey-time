const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

//Connect to DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

const db = {};

db.sequelize = sequelize;


//Tables
db.surveys = require('./models/surveys')(sequelize);
db.survey_questions = require('./models/survey.questions')(sequelize);
db.survey_answers = require('./models/survey.answers')(sequelize);


//Relations
db.surveys.hasMany(db.survey_questions, { foreignKey: 'survey_id'});
db.survey_questions.belongsTo(db.surveys, { foreignKey: 'survey_id' });

db.survey_answers.belongsTo(db.survey_questions, { foreignKey: 'question_id'});
db.survey_questions.hasMany(db.survey_answers, { foreignKey: 'question_id' })
module.exports = db;
