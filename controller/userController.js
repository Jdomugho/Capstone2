const User = require("../modules/User")
const Products = require("../modules/Products")
const bcrypt = require('bcrypt')
const auth = require("../auth")



module.exports.registerUser = (reqBody) => {
	// Creates a variable "newUser" and instantiates a new "User" object using the mongoose model
	// Uses the information from the request body to provide all the necessary information

	let newUser = new User({
		email : reqBody.email,
		// 10 is the value provided as the number of "salt" rounds that the bycrypt algorithm will run in order to encrypt the password
		password : bcrypt.hashSync(reqBody.password, 10)
	})

	// saves the created object to our database
	return newUser.save().then((user, error) => {
		// User registration failed
		if(error){
			return false
		// User registration successful
		}else{
			return true
		}
	}).catch(err => err)
}


module.exports.loginUser = (req, res) => {
	return User.findOne({email : req.body.email}).then(result => {
		// User does not exist
		if(result == null){
			return false;
		// User exists
		}else{
			// Creates the variable "isPasswordCorrect" to return the result of comparing the login form password and the database password
			// the "compareSync" method is used to compare non encrypted password from the login from to the encrypted password retrieved from the database and returns "true" or "false" value depending on the result
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)

			// If the passwords match/result of the above code is true
			if(isPasswordCorrect){
				// Generate an access token
				// Uses the "createAccessToken" method defined in the "auth.js" file
				return res.send({access : auth.createAccessToken(result)})
			//Passwords do not match 
			}else {
				return res.send(false);
			}
		}
	}).catch(err => res.send(err))


}


module.exports.createProduct = (reqBody) => {
	
	let newProduct = new Products({
		name : reqBody.name,
		description : reqBody.description,
		price : reqBody.price,
		isActive : reqBody.isActive,

		})
	return newProduct.save().then((user, error) => {
		
		if(error){
			return false
	
		}else{
			return true
		}
	}).catch(err => err)
}


module.exports.userCheckout = async (req, res) => {
	console.log(req.user.id)
	console.log(req.body.productId)

	if(req.user.isAdmin){
		return res.send("Action Forbidden")
	}
	

	let isUserUpdated = await User.findById(req.user.id).then(user => {
	
		let newOrder = {
			productId: req.body.productId,
			productName: req.body.productName,
			quantity: req.body.quantity,
		
		}
	
		user.orderedProduct.push(newOrder);
	
		return user.save().then(user => true).catch(err => err.message)
	})

	if(isUserUpdated !== true){
		return res.send({message : isUserUpdated})
	}

	let isOrderUpdated = await Products.findById(req.body.productId).then(products => {
		let userOrders = {
			userId : req.user.id

		}

		products.userOrders.push(userOrders)

		return products.save().then(products => true).catch(err => err.message)
	})

	if(isOrderUpdated !== true){
		return res.send({message : isOrderUpdated})
	}

	if(isUserUpdated && isOrderUpdated){
		return res.send({message: "Ordered Successfully"})
	}
}


module.exports.userDetails = (req, res) => {


    return User.findById(req.user.id)
    .then(result => {

        // Changes the value of the user's password to an empty string when returned to the frontend
        // Not doing so will expose the user's password which will also not be needed in other parts of our application
        // Unlike in the "register" method, we do not need to call the mongoose "save" method on the model because we will not be changing the password of the user in the database but only the information that we will be sending back to the frontend application
        result.password = "";

        // Returns the user information with the password as an empty string
        return res.send(result);

    })
    .catch(err => res.send(err))
};
