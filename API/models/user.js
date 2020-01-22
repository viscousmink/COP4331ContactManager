const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	user: String,
	password: String,
	first_name: String,
	last_name: String,
	email: String
})

module.exports = mongoose.model('User', userSchema);