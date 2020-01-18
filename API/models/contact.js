//const mongoose = require('mongoose');

// _id is implied
//const contactSchema = mongoose.Schema({
//	user_id: String
//});

//const contact = mongoose.model('contact', contactSchema);

//module.exports = contact;

class Contact {
	constructor() {
	}

	_createContact(name) {
		JSON = {
			"name": name
		}
		return JSON
	}
}

module.exports = new Contact()