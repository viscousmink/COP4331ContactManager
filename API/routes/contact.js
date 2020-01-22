const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Contact = require('../models/contact');
const sanitize = require('mongo-sanitize');

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
	202: document_not_found
	500: ERROR!
*/

router.post('/allcontacts', function(req, res) {
	const user = sanitize(req.body.user);
	if(user) {
		Contact.find({user: user}, function(err, documents){
			if(!err) {
				res.statusCode = 200;
				res.json({
					return: documents
				});
			} else {
				res.statusCode = 500;
				res.json({
					msg: err
				})
			}
		});
	} else {
		res.statusCode = 201;
		res.json({error: "no_user_provided"});
	}
});

router.post('/addcontact', function(req, res) {
    const user = sanitize(req.body.user);

    if(user) {
    	const contact = new Contact({
    		_id: new mongoose.Types.ObjectId(),
    		user: user
    	});
    	contact.save().then(function(result) {
    		console.log(result);
    		res.statusCode = 200;
    		res.json({
    			addedContact: contact
    		});
    	}).catch(function(err) {
    		console.log(err);
    		res.statusCode = 500
    		res.json({
    			error: err
    		});
    	});
    } else {
    	res.statusCode = 201;
    	res.json({error: 'no_user_provided'});
    }
});

router.post('/deletecontact', function(req, res) {
	const user = sanitize(req.body.user);

	if(user) {
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
	}
})

module.exports = router;