require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const database = require('./database.js');


/*mongoose.connect(database.URL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
}); */

//const listener = require('./API/listener.js');

const app = express();
/*app.use(function(req, res, next) {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
}); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api', require('./API/app.js'));

app.get('/*', (req, res) => {
	res.sendFile('/frontend/public/index.html', { root: __dirname});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Wizardous stuff on ' + PORT));
