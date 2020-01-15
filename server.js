require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
//const database = require('./database.js');

const CosmosClient = require('@azure/cosmos').CosmosClient;

const mongoClient = new CosmosClient("mongodb://viscousmink:03VnXo6H953S1Ixpw5H35vYG5auG1XfCrg7y9Of6l87JdGCCQux1gDGP9AlEw9DpoVg0ykzY0BrT4ZmtzunLwg==@viscousmink.documents.azure.com:10255/?ssl=true&replicaSet=globaldb")

//var mongoClient = require("mongodb").MongoClient;
//mongoClient.connect("mongodb://viscousmink:03VnXo6H953S1Ixpw5H35vYG5auG1XfCrg7y9Of6l87JdGCCQux1gDGP9AlEw9DpoVg0ykzY0BrT4ZmtzunLwg%3D%3D@viscousmink.documents.azure.com:10255/?ssl=true", function (err, client) {
//  client.close();
//})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: __dirname});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Wizardous stuff on ' + PORT))


//test code
const databaseID = 'firstDBID';
const containerID = 'firstCID';
const itemID = {
	id: 'TestOut.1',
	country: 'USA',
	name: 'firstName',
	lastName: 'lastName'
	}

const { database } = mongoClient.databases.createIfNotExists({ id: databaseID });

const { container } = mongoClient.database(databaseId).containers.createIfNotExists({ id: containerID });

const { item } = client.database(databaseId).container(containerId).items.create(item);