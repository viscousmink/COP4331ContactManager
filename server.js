require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const database = require('./database.js');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', require('./API/app.js'));

//app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get('/*', (req, res) => {
	res.sendFile('/frontend/public/index.html', { root: __dirname });
	//rex.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

if (process.env.NODE_ENV == 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));

	// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Wizardous stuff on ' + PORT));
