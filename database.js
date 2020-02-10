require('dotenv').config();

const { DBPASSWORD, DBUSER } = process.env;

module.exports = {
	URL:
		'mongodb+srv://' + DBUSER + ':' + DBPASSWORD + '@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority'
};
