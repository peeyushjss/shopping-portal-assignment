'use strict';

const express = require('express'),
    Db = require('./db'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const app = express();

app.use((req, res, next) => { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


//Getting a path for model directory, where schema is defined
const normalizedPath = require("path").join(__dirname, "./model");

//Registering mongoose schema
require("fs").readdirSync(normalizedPath).forEach((file) => {
    require("./model/" + file);
});

require('./routes')(app);

module.exports = app;