//const mongoose = require('mongoose');

// _id is implied
//const contactSchema = mongoose.Schema({
//	user_id: String
//});

//const contact = mongoose.model('contact', contactSchema);

//module.exports = contact;

class Contact {
	constructor(name) {
		this.JSON = {
			"name": name
		}
	}
}