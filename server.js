const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema');

const app = express();

// app.use(bodyParser());

app.use(express.static(__dirname + '/src'));

app.use('/graphql', graphqlHTTP ((req) => ({
  schema: schema,
  pretty: true,
  graphiql: true
})));

mongoose.connect('mongodb://localhost/boxnums');

app.listen(3000, () => {
  console.log('app listening on 3000');
});