const UserController = require('../controllers/user.controller')
const AuthCheck = require("../middleware/auth") 

module.exports = app => {

    app.post("/user/register", UserController.register)
    app.post("/user/login", UserController.login)
    app.get("/user/authCheck", UserController.authCheck)


    app.get("/test", AuthCheck,(req, res, next) => {
        // console.log("route hit", req.ip)
        // console.log("auth check". req)
        // console.log("req.app.locals",req.app.locals)
        console.log("req.locals", req.locals)
        res.json({message: "test good, end points working", user: req.locals})
    })

    app.get("/user/all", UserController.all)

}