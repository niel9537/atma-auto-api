const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('./uploads'));

const appRoute = require('./src/routes/route');
app.use('/',appRoute);

app.listen(5000, () => {
    console.log('Listening on port 5000');
});


