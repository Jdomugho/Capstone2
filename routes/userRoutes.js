const express = require("express")
const userController = require("../controller/userController")
const auth = require('../auth')

const {verify, verifyAdmin} = auth

const router = express.Router()


 router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(resultFromController => {
      res.send(resultFromController)
    })
  })

router.post("/login", userController.loginUser)

router.post('/userCheckout', verify, userController.userCheckout);

router.get("/userDetails", verify, userController.userDetails);


module.exports = router;