const mongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db;

class Database {
	constructor() {
		this._connect('startingoutnoProvThrough', {"random": "random"});
	}

	_connect() {
    	mongoClient.connect('mongodb://viscousmink:03VnXo6H953S1Ixpw5H35vYG5auG1XfCrg7y9Of6l87JdGCCQux1gDGP9AlEw9DpoVg0ykzY0BrT4ZmtzunLwg==@viscousmink.documents.azure.com:10255/?ssl=true&replicaSet=globaldb', function (err, client) {
	 		if(!err) {
	  			console.log('Connected');
	  			var db = client.db('startingoutnoProvThrough');
	  			console.log('DB name is : ' + db.databaseName);
	  			//db.collection('noProvThrough').insertOne({"id": "Something"}, function(err, result) {
    			//	if (err) throw err;
    			//	console.log(result);
  				//	});
	  			client.close();
			}
		});
	}
	_connect(dbName, JSON) {
		mongoClient.connect('mongodb://viscousmink:03VnXo6H953S1Ixpw5H35vYG5auG1XfCrg7y9Of6l87JdGCCQux1gDGP9AlEw9DpoVg0ykzY0BrT4ZmtzunLwg==@viscousmink.documents.azure.com:10255/?ssl=true&replicaSet=globaldb'), function(err, client) {
			if(!err) {
				console.log('Connected');
				var db = client.db('startingoutnoProvThrough');
				console.log('DB name is : ' + db.databaseName);
				db.collection('noProvThrough').insertOne(JSON, function(err, result) {
					if(err) throw err;
					console.log(result);
				})

				client.close();
			}
		};
	}
}

module.exports = new Database()