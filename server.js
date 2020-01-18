require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
//const database = require('./database.js');

const database = require('./database.js');
const contact = require('./API/models/contact.js');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/*', (req, res) => {
	res.sendFile('../frontend/public/index.html', { root: __dirname});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Wizardous stuff on ' + PORT))
