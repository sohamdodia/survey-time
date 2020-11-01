
const { makeExecutableSchema } = require('graphql-tools');
const { rule, shield } = require('graphql-shield');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const services = require('../services');
const utils = require('../utils');

const typeDefs = `
  type Survey {
    id: ID!
    name: String
    created_by: String
  }

  type SurveyQuestion {
    id: ID!
    question: String
  }

  type SurveyAnswer {
    id: ID!
    question_id: Int!
    survey_id: Int!
    answer_given_by: String!
    selected_option_value: String!
  }

  type CreateSurvey {
    Survey: Survey!
    SurveyQuestion: [SurveyQuestion!]!
  }

  type FetchSurveys {
    id: ID!
    name: String
    created_by: String
    survey_questions: [SurveyQuestion!]!
  }

  type SurveyResult {
    name: String!
    created_by: String!
    survey_questions: [SurveyQuestionResult]!
  }

  type SurveyQuestionResult {
    question: String!
    survey_answers: [SurveyAnswer!]!
  }

  type Query {
    fetchSurveys: [FetchSurveys!]!
    surveyResult(id: ID!): [SurveyResult!]!
  }

  type CreateToken {
    token: String!
  }

  type GenarateThumbnail {
    url: String!
  }

  type Mutation {
    createSurvey(name: String, questions: [SurveyQuestionInput!]!): CreateSurvey!
    takeSurvey(question_id: Int!, survey_id: Int!, selected_option_value: String!): SurveyAnswer!
    createToken(username: String!, password: String!): CreateToken!
    generateThumbnail(url: String!): GenarateThumbnail!
  }

  input SurveyQuestionInput {
    question: String
  }
`

const resolvers = {
  Query: {
    fetchSurveys: async (parent, args, ctx) => {
      return await services.fetchSurveys(ctx.db);
    },
    surveyResult: async (parent, args, ctx) => {
      return await services.surveyResult(ctx.db, args);
    }
  },
  Mutation: {
    createSurvey: async (parent, args, ctx) => {
      args.username = ctx.username;

      const { createdSurvey, createdQuestions } = await services.createSurvey(ctx.db, args)
      return {
        Survey: createdSurvey,
        SurveyQuestion: createdQuestions
      }
    },
    takeSurvey: async (parent, args, ctx) => {
      args.answer_given_by =  ctx.username;
      return await services.takeSurvey(ctx.db, args)
    },
    createToken: async (parent, args, ctx) => {
      const token = utils.generateToken(args.username);
      return { token };
    },
    generateThumbnail: async (parent, args, ctx) => {
      const origin = ctx.req.req.headers.origin;
      const fileName = await services.generateThumbnail(args.url);
      return {
        url: `${origin}/${fileName}`
      }
    }
  }
}

//Check if JWT token is present or not
//If present, check if it's valid or not
const getUser = (req) => {
  const auth = req.req.get('Authorization')
  if (auth) {
    const parts = auth.split(' ');
    const [, token] = parts;
    if (token) { //decode token if token found
      try {
        const { username } = jwt.verify(token, config.const.token.secret);
        return username;
      } catch (error) {
        return null;
      }
    }
  } else {
    return null;
  }
}



const isAuthenticated = rule()(
  async (parent, args, ctx, info) => {
    return Boolean(ctx.username)
  }
)

// Permissions
const permissions = shield({
  Query: {
    fetchSurveys: isAuthenticated,
    surveyResult: isAuthenticated
  },
  Mutation: {
    createSurvey: isAuthenticated,
    takeSurvey: isAuthenticated
  }
})

const graphqp_schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

module.exports = {
  graphqp_schema,
  getUser,
  permissions
}