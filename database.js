require('dotenv').config();

const { DBPASSWORD, DBUSER } = process.env;

module.exports = {
<<<<<<< HEAD
	URL: `mongodb+srv://${USER}:${PASSWORD}@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority`
=======
	URL:
		'mongodb+srv://' + DBUSER + ':' + DBPASSWORD + '@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority'
>>>>>>> c386e2c44b9768d9a394b9d83739df20bc04b915
};
