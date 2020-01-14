const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	user_id: String
});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;