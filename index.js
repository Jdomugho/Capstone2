
const express = require("express")
const mongoose = require("mongoose")

const cors = require("cors")



const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")


const port = 4020

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.use("/b20/user", userRoutes);

app.use("/b20/product", productRoutes);





mongoose.connect("mongodb+srv://jdomugh:admin123@course-booking.ge6seot.mongodb.net/E-commerce_API?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

if(require.main === module){
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${process.env.PORT || port}`)
	})
}

// export mongoose only for checking
module.exports = {app, mongoose};