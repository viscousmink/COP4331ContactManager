const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Contact = require('../models/contact');
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
})

/* Possible Post requests
	allContacts: 
		-- returns all the contacts of the user
	addContact:
		-- adds a contact to the user's list
	deleteContact:
		-- deletes a contact to the user's list
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
	/*const user = sanitize(req.body.user);

	var err = '';
	if(user) {
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
	if(user) {
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

router.post('/addcontact', async(req, res, next) =>
{
    const user = sanitize(req.body.user);
    const first_name = sanitize(req.body.first_name);
    const last_name = sanitize(req.body.last_name);
    const phone_number = sanitize(req.body.phone_number);
    const email = sanitize(req.body.email);
    const street = sanitize(req.body.street);
    const city = sanitize(req.body.city);
    const state = sanitize(req.body.state);

    /*if(user) {
    	const contact = new Contact({
    		_id: new mongoose.Types.ObjectId(),
    		user: user,
    		first_name: first_name,
    		last_name: last_name,
    		phone_number: phone_number,
    		email: email,
    		street: street,
    		city: city,
    		state: state
    	});
    	contact.save().then(function(result) {
    		console.log(result);
    		res.statusCode = 200;
    		res.json({addedContact: contact});
    	}).catch(function(err) {
    		console.log(err);
    		res.statusCode = 500
    		res.json({msg: err});
    	});
    } else {
    	res.statusCode = 201;
    	res.json({error: 'no_user_provided'});
    } */

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
		const db = client.db();
		const result = await db.collection('Contacts').remove(contact); 
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

module.exports = router;