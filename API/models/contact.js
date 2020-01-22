const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	user: String,
	first_name: String,
	last_name: String,
	
})

module.exports = mongoose.model('Contact', contactSchema);