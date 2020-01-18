function Test() {
	let userModel = require('./API/models/user.js')

	let msg = new userModel({
	  user_id: 'testerID'
	})

	msg.save()
	   .then(doc => {
	     console.log(doc)
	   })
	   .catch(err => {
	     console.error(err)
	   })
}