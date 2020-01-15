const mongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db;
const insert = function(db) {
	db.collection('startingout').insertOne( {
		"id": "Something"
	}, function(err, result) {
		if(err == null) {
			console.log('Inserted a document into the db');
		} else {
			console.log('failed insertion');
		}
	});
}

var insertDocument = function(db, callback) {
db.collection('families').insertOne( {
        "id": "AndersenFamily",
        "lastName": "Andersen",
        "parents": [
            { "firstName": "Thomas" },
            { "firstName": "Mary Kay" }
        ],
        "children": [
            { "firstName": "John", "gender": "male", "grade": 7 }
        ],
        "pets": [
            { "givenName": "Fluffy" }
        ],
        "address": { "country": "USA", "state": "WA", "city": "Seattle" }
    }, function(err, result) {
    console.log("Inserted a document into the families collection.");
    callback();
});
};

class Database {
	constructor() {
		this._connect()
	}

	_connect() {
    	mongoClient.connect('mongodb://viscousmink:03VnXo6H953S1Ixpw5H35vYG5auG1XfCrg7y9Of6l87JdGCCQux1gDGP9AlEw9DpoVg0ykzY0BrT4ZmtzunLwg==@viscousmink.documents.azure.com:10255/?ssl=true&replicaSet=globaldb', function (err, client) {
	 		if(!err) {
	  			console.log('Connected');
	  			var db = client.db('startingout');
	  			console.log('DB name is : ' + db.databaseName);
	  			db.collection('startingout').findOne({}, function(err, result) {
    				if (err) throw err;
    				console.log(result);
    				db.close();
  					});
			}
		});
	}
}

module.exports = new Database()