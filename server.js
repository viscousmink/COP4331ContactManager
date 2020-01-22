require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const database = require('./database.js');
const Contact = require('./API/models/contact.js');


/*mongoose.connect(database.URL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
}); */

const listener = require('./API/listener.js');

listener.get('/*', (req, res) => {
	res.sendFile('/frontend/public/index.html', { root: __dirname});
});

const PORT = process.env.PORT;
listener.listen(PORT, () => console.log('Wizardous stuff on ' + PORT));
