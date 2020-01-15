require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
//const database = require('./database.js');

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://viscousmink:03VnXo6H953S1Ixpw5H35vYG5auG1XfCrg7y9Of6l87JdGCCQux1gDGP9AlEw9DpoVg0ykzY0BrT4ZmtzunLwg%3D%3D@viscousmink.documents.azure.com:10255/?ssl=true", function (err, client) {
  client.close();
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: __dirname});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Wizardous stuff on ' + PORT))


//test code
databaseID = 'firstDBID';
containerID = 'firstCID';
item ={
	id: 'TestOut.1',
	country: 'USA',
	name: 'firstName',
	lastName: 'lastName'
	}

const { database } = await mongoClient.databases.createIfNotExists({ id: databaseID });

const { container } = await mongoClient.database(databaseId).containers.createIfNotExists({ id: containerID });

const { item } = await client.database(databaseId).container(containerId).items.create(item);