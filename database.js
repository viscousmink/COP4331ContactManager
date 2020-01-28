require('dotenv').config();

const { PASSWORD } = process.env;

module.exports = {
    URL : 'mongodb+srv://viscousmink:' + PASSWORD + '@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority'
};