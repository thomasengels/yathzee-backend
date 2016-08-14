require('dotenv').load();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');


require('./models/db');
require('./config/passport');

var routesApi = require('./controllers/index');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', routesApi);

app.listen(3001, function(){
    console.log('yathzee runs on port 3001');
});