const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const userRoute = require('./routes/user.js');
const contactRoute = require('./routes/contact.js');
app.use('/users', userRoute);
app.use('/contacts', contactRoute);

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});


module.exports = app;