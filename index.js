const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } =  require('graphql-middleware')

const routes = require('./src/routes');
const config = require('./config');
const db = require('./src/db')
const { graphqp_schema, getUser, permissions } = require('./src/graphql/graphql-schema');

const server = new ApolloServer({
	schema: applyMiddleware(graphqp_schema, permissions),
	context: (req) => ({
		req,
		db: db,
		username: getUser(req)
	})
});


const app = express();
const port = process.env.PORT || config.const.apiPort;

//JSON parser
app.use(bodyParser.json());

//Server Routes
app.use('/', routes);

// //Server Static Files
app.use(express.static('public'))

server.applyMiddleware({ app });

//Start Server
app.listen(port, (error) => {
	if (error) {
		console.log('error', error);
	} else {
		console.log(`Application is runnig on ${port}`);
	}
});