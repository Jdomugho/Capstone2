

const Products = require("../modules/Products")



module.exports.createProduct = (req, res) => {

   
    let newProduct = new Products({
		name : req.body.name,
		description : req.body.description,
		price : req.body.price,
		isActive : req.body.isActive

	 })


    return newProduct.save().then((products, error) => {

        // Course creation successful
        if (error) {
            return res.send(false);

        // Course creation failed
        } else {
            return res.send(true);
        }
    })
    .catch(err => res.send(err))
};


module.exports.getAllProducts = (req, res) => {

	  return Products.find({}).then(result => {
	  	return res.send(result)
	  })
}


module.exports.getAllActiveProducts = (req, res) => {

	return Products.find({isActive : true}).then(result => {
		return res.send(result)
	})
}


module.exports.getProduct = (req, res) => {

	return Products.findById(req.params.productId).then(result =>{
		return res.send(result)
	})
	
}

module.exports.updateProduct = (req, res) => {
	let updateProduct = {
		name : req.body.name,
		description : req.body.description,
		price : req.body.price,
	}

	return Products.findByIdAndUpdate(req.params.productId, updateProduct).then((products, error)=>{
		if(error){
			return res.send(false)
		}else{
			return res.send(true)
		}
	})
}



module.exports.archiveProduct = (req, res) => {
	let statusProduct = {
		isActive: false
	};
	return Products.findByIdAndUpdate(req.params.productId, statusProduct).then((products, error) => {
		if (error) {
			return res.send(false)
		}
		else {
			return res.send(true)
		}
	})

}


module.exports.activateProduct = (req, res) => {
	let updatedIsActive = {

		isActive : true,
	}

	return Products.findByIdAndUpdate(req.params.productId, updatedIsActive).then((products, error)=>{
		if(error){
			return res.send(false)
		}else{
			return res.send(true)
		}
	})
}