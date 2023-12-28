const UserController = require('../controllers/user.controller')

module.exports = app => {

    app.post("/user/register", UserController.register)


    app.get("/test", (req, res) => {
        console.log("route hit", req.ip)
        res.json("test good, end points working")
    })

}