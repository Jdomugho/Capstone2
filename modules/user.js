//[SECTION] Modules and Dependencies
const mongoose = require("mongoose")

//[SECTION] Schema/Blueprint
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Email is required"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    orderedProduct : [
        {
            products : [

                    {
                        productName : {
                        type : String,
                        required : [true, "Product name is required"]
                    },
                       quantity : {
                        type : String,
                    },

                    }
                      ],

            totalAmount : {
                type : Number,
               
            },
            purchasedOn : {
                type : Date,
                default : new Date()
            }
        }
    ]
})



    module.exports = mongoose.model("User", userSchema);