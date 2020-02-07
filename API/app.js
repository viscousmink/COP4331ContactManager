const express     = require('express');
const mongoose    = require('mongoose');
const router      = express.Router();
const jwt         = require('jsonwebtoken');
const bcrypt      = require('bcryptjs');
const sanitize    = require('mongo-sanitize');
const database    = require('../database.js');
const bodyParser  = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const client      = new MongoClient(database.URL, {useUnifiedTopology: true});

//connecting to the server
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

/* Possible requests -- 
	allContacts: 
		-- returns all the contacts of the user
		
	addContact:
		-- adds a contact to the user's list

	deleteContact:
		-- deletes a contact to the user's list

	createuser:
		-- creates a new user

	login:
		-- login a user based on the entered credentials

	? updateContact:
		-- updates a contact that is already created on the user's list

	? searchContacts:
		--returns the contacts that include any characters they are searching for
*/

/*
Status Codes :
	200: complete success
	201: no_user_provided
	204: document_not_found
	500: ERROR!
*/

//send a get request to return all contacts
router.get('/allcontacts', async(req, res, next) =>
{
	console.log(req.body.user);
	const user = sanitize(req.body.user);

	var err = '';
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

//send a post request to create a new contact
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

//send a delete request to delete a contact
router.delete('/deletecontact', async(req, res, next) =>
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
	const results = await db.collection('Contacts').deleteOne(contact);
	if(!results) {
		err = 'document_not_found';
	}

	var err = '';
	var ret = {error: err};
	res.status(200).json(ret);
})

//need to check/test implementation of Login**
router.post('/login', async(req, res, next) =>
{
	const user = sanitize(req.body.user);
	const password = sanitize(req.body.password);

	const db = client.db();
	const result = await db.collection('Users').findOne({"user": user})
	var err = '';

	//console.log(result.password);
	if(bcrypt.compareSync(password, result.password) == true) {
		err = '';
	} else {
		err = 'not_correct_password';
	}

	var ret = {
		error: err
	}


	res.status(200).json(ret);
});

//send a post request to create a new user
router.post('/createuser', async(req, res, next) => 
{
	const user = sanitize(req.body.user);
	const password = sanitize(req.body.password);

	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);

	const newUser = {
		_id: new mongoose.Types.ObjectId(),
		user: user,
		password: hash
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

/*
//implement updateContact using put request 
router.put('/updateContact', async(req, res, next) =>
{

}

//implement searchContact using post request
router.post('/searchContact', async(req, res, next) =>
{

}
*/

module.exports = router;