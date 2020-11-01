
# Project 

RESTful and GraphQL APIs for Survey Time

## Getting Started
**Pre requirements**
- node
- npm

1. Clone this repo
2. Copy `.env.example` file into `.env` file and add credentials.
3. run `npm i`
4. run `npm start`
5. Server is running at: [http://localhost:6005](http://localhost:6005)
6. GraphQL Server is running at: [http://localhost:6005/graphql](http://localhost:6005/graphql)

## End Points
  * `POST /image-thumbnail`
      * Create Thumbnail from a public URL
      * **Requires**: `url`
      * **Accepts**: `url` 
      * **Example**: ```{ "url": "https://someimageurl.com" }```
  * `POST /authenticate`
      * Generate JWT token for user
      * **Requires**: `username, password`
      * **Accepts**: `username, password`
      * **Example**: ```{ "username": "john", "password": "password" }```
  * `GET /survey/fetch`
      * Get all surveys
  * `POST /survey/create`
      * Create a new Survey
      * **Requires**: `name, questions`
      * **Accepts**: `name, questions`
      * **Example**: ```{ "name": "Survey 1", "questions": [{ "question": "Question 1" }, { "question": "Question 2" } ]}```
  * `POST /survey/take`
      * Take a Survey
      * **Requires**: `question_id, survey_id, selected_option_value`
      * **Accepts**: `question_id, survey_id, selected_option_value`
      * **Example**: ```{ "question_id": 2, "survey_id": 1, "selected_option_value": "no" }```
  * `GET /survey/result/:id`
      * Fetch Result for one particular Survey
      * Pass survey id in URL

## Note
- `/survey/fetch`, `/survey/create`, `/survey/create`, `/survey/result/:id` are protected routes. Pass JWT token in **headers**. Example: ```Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvZGlhIiwiaWF0IjoxNjA0MTI3NDQxLCJleHAiOjE2MDUwNjA1NjF9.i_HxzEa7reNBs98veqLVnGui5OrL2vfTpFXuCm2l_3E```

- For GraphQL: `fetchSurveys`, `surveyResult`, `createSurvey`, `takeSurvey` are also protected. Pass JWT token in **HTTP HEADERS** while accessing them. Example: ```{ "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvZGlhIiwiaWF0IjoxNjA0MTY5NDExLCJleHAiOjE2MDUxMDI1MzF9.zyIN5abVjXWK-r6UPT96Xs7VhrhDAIJuLeQ5rdh8Aso"}```

- For GraphQL examples: Please refer src/graphql/example.txt file