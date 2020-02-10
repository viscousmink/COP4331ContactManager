require('dotenv').config();

const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;

module.exports = {
<<<<<<< HEAD
    URL : 'mongodb+srv://viscousmink:' + PASSWORD + '@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority'
=======
    URL : 'mongodb+srv://' + USER + ':' + PASSWORD + '@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority'
>>>>>>> c17571e22778f6b25e083d4f73e95d9ddc6931d9
};