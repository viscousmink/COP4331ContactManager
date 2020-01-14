const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_id: String
});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;