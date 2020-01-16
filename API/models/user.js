//const mongoose = require('mongoose');

// _id is an implied entry into the schema
//const userSchema = mongoose.Schema({
//	user_id: String
//});

//const user = mongoose.model('user', userSchema);

//module.exports = user;

class User {
	constructor(user) {
		this.JSON = {
			"userID": user
		}
	}
}