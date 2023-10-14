const express = require("express")
const productController = require("../controller/productController")

const auth = require('../auth')

const router = express.Router()

const {verify, verifyAdmin} = auth



router.post("/createProduct", auth.verify, verifyAdmin, productController.createProduct)

router.get("/allProducts", productController.getAllProducts)

router.get("/allActiveProducts", productController.getAllActiveProducts)


router.get("/:productId", productController.getProduct)

router.put("/:productId", verify, verifyAdmin, productController.updateProduct)

router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct)

router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct)




module.exports = router
