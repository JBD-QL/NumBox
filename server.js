const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const numBoxController = require('./server/controllers/numBoxController');


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/nums', numBoxController.retrieve);

app.post('/nums', numBoxController.save);

app.listen(3000, () => {
  console.log('app listening on 3000');
});