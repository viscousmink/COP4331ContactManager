const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const sanitize = require('mongo-sanitize');
const database = require('../database.js');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(database.URL, {useUnifiedTopology: true});

client.connect(function(err, db) {
	if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.use((req, res, next) => 
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

/* Possible Post requests
	allContacts: 
		-- returns all the contacts of the user
	addContact:
		-- adds a contact to the user's list
	deleteContact:
		-- deletes a contact to the user's list
	createuser:
		--
	login:
		--
*/
/*
Status Codes :
	200: complete success
	201: no_user_provided
	204: document_not_found
	500: ERROR!
*/

router.post('/allcontacts', async(req, res, next) =>
{
	console.log(req.body.user);
	const user = sanitize(req.body.user);

	var err = '';
	/*if(user) {
		Contact.find({user: user}, function(err, documents){
			if(!err) {
				res.statusCode = 200;
				res.json({
					return: documents
				});
			} else {
				res.statusCode = 500;
				res.json({msg: err})
			}
		});
	} else {
		res.statusCode = 201;
		res.json({error: "no_user_provided"});
	} */
	if (user) {
		const db = client.db();
		const results = await db.collection('Contacts').find({"user": user}).toArray();
		var _ret= [];
		for(var i = 0; i<results.length; i++) {
			_ret.push({
				first_name: results[i].first_name,
				last_name: results[i].last_name,
				phone_number: results[i].phone_number,
				email: results[i].email,
				street: results[i].street,
				city: results[i].city,
				state: results[i].state
			})
		}
		var ret = {results:_ret, error:err};
  		res.status(200).json(ret)
	} 
});

 router.post('/addcontact/', async(req, res, next) =>
{
    const user = sanitize(req.body.user);
    const first_name = sanitize(req.body.first_name);
    const last_name = sanitize(req.body.last_name);
    const phone_number = sanitize(req.body.phone_number);
    const email = sanitize(req.body.email);
    const street = sanitize(req.body.street);
    const city = sanitize(req.body.city);
    const state = sanitize(req.body.state);

	const contact = {
		_id: new mongoose.Types.ObjectId(),
		user: user,
		first_name: first_name,
		last_name: last_name,
		phone_number: phone_number,
		email: email,
		street: street,
		city: city,
		state: state
	}
	var err = '';
	try {
		const db = client.db();
		const result = await db.collection('Contacts').insertOne(contact);
	} catch(e) {
		err = e.toString();
	}
	var ret = {error: err};
	res.status(200).json(ret);

}); 

router.post('/deletecontact', async(req, res, next) =>
{
	const user = sanitize(req.body.user);
    const first_name = sanitize(req.body.first_name);
    const last_name = sanitize(req.body.last_name);
    const phone_number = sanitize(req.body.phone_number);
    const email = sanitize(req.body.email);
    const street = sanitize(req.body.street);
    const city = sanitize(req.body.city);
    const state = sanitize(req.body.state);

    const contact = {
		user: user,
		first_name: first_name,
		last_name: last_name,
		phone_number: phone_number,
		email: email,
		street: street,
		city: city,
		state: state
	}

	const db = client.db();
	const results = await db.collection('Contacts').find(contact);

	const remContact = {
		_id: results._id,
		user: user,
		first_name: first_name,
		last_name: last_name,
		phone_number: phone_number,
		email: email,
		street: street,
		city: city,
		state: state
	}

	var err = '';

	try {
		const result = await db.collection('Contacts').deleteOne(remContact); 
	} catch(e) {
		err = e.toString();
	}
	var ret = {error: err};
	res.status(200).json(ret);



	/*if(user) {
		Contact.remove({user: user}, function(err) {
			if(!err) {
				res.statusCode = 200;
				res.json({msg: 'contact_deleted'});
			} else {
				res.statusCode = 500;
				res.json({msg: err});
			}
		})
	} else {
		res.statusCode = 201;
		res.json({error: 'no_user_provided'})
	} */
})

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
});

module.exports = router;