const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { mongoDbConnection } = require('./mongodb');
const schema = require('./schema/schema');
const app = express();
require('dotenv').config();

mongoDbConnection();
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(5000, () => {
  console.log('server started 5000');
});
