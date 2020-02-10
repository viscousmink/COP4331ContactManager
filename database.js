require('dotenv').config();

const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;

module.exports = {
	URL: `mongodb+srv://${USER}:${PASSWORD}@cluster0-sb44x.azure.mongodb.net/test?retryWrites=true&w=majority`
};
