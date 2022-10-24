const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('./uploads'));
const appRoute = require('./src/routes/route');
// const { urlencoded } = require('body-parser');


app.use('/',appRoute);

app.listen(5000, (req) => {
    console.log('Listening on port 5000');
});

