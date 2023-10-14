// [SECTION] Dependencies and Modules
const mongoose = require("mongoose");

// [SECTION] Schema/Blueprint
const productSchema =  new mongoose.Schema({
	name : {
		type: String,
		// Requires the data for our fields/properties to be included when creating a record
		// the "true" value defines if the field is required or not and the second element in the array is the message that will be printed out in our terminal when the data is not present
		required: [true, "Product is required"]
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		// The "new Date()" expression instantiates a new "date" that stores teh current date and time whenever a course is created in our database
		default: new Date()
	},
	 //The "enrollees" property/field will be an array of objects containing the user ID's and the date and time that the user enrolled to the course
	  // We will be applying the concept of referencing data to establish a relationship between our courses and users 
	 userOrders : [
        {
            orderId : {
                type : String,
              
            },
           
        }
    ]


})	

module.exports = mongoose.model("Products", productSchema);