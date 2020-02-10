require('dotenv').config();

const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;

module.exports = {
<<<<<<< HEAD
    URL : 'mongodb+srv://' + USER + ':' + PASSWORD + '@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority'
};
=======
	URL:
		'mongodb+srv://viscousmink:' +
		PASSWORD +
		'@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority'
};
>>>>>>> 0c8fd4720a7fc9d502d6f96ee6b6c41c78c8a6a6
