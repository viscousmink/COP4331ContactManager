const mongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db;
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
			}
		});
	}
}

module.exports = new Database()