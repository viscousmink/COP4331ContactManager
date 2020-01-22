const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Contact = require('../models/user.js');
const sanitize = require('mongo-sanitize');
const database = require('../../database.js');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(database.URL, {useUnifiedTopology: true});
client.connect(function(err, db) {
	if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

/* Possible Post requests
	login:
		-- search the database for the user and password provided
	createUser:
		-- put the new user in the database
\*/
/*
Status Codes :
	200: complete success
	201: no_user_provided
	202: document_not_found
	500: ERROR!
*/

router.post('/login', async(req, res, next) =>
{
	const user = sanitize(req.body.user_name);
	const password = sanitize(req.body.password);

	/*if(user && password) {
		User.findOne({user: user, password: password}).exec().then(function(document) {
			console.log(document);
			if(document) {
				res.statusCode = 200;
				res.json({document})
			} else {
				res.statusCode = 202;
				res.json({msg: "document_not_found"});
			}
		});
	} else {
		res.statusCode = 201;
		res.json({msg: "no_user_provided"});
	} */

	const db = client.db();
	const results = await db.collection('Users').find({"user": user, "password": password}).toArray();

	//IMPLEMENT
	//IMPLEMENT
	//IMPLEMENT

});

router.post('/createuser', async(req, res, next) => 
{
	const user = sanitize(req.body.user);
	const password = sanitize(req.body.password);

	const newUser = {
		_id: new mongoose.Types.ObjectId(),
		user: user,
		password: password,
	}
	var err = '';
	try {
		const db = client.db();
		const result = await db.collection('Users').insertOne(newUser);
	} catch(e) {
		err = e.toString();
	}
	var ret = {error: err};
	res.status(200).json(ret);

	/*if(user && password) {
		const newUser = new User({
			_id: new mongoose.Types.ObjectId(),
			user: user,
			password: password,
			first_name: first,
			last_name: last,
			email: email
		});

		user.save().then(function(result) {
			console.log(result);
			res.statusCode = 200;
			res.json({msg: "success"});
		}).catch(function(err) {
			console.log(err);
			res.statusCode = 500;
			res.json({msg: "failure"});
		});
	} else {
		res.statusCode = 201;
		res.json({msg: "no_user_provided"});
	}*/
});

module.exports = router;