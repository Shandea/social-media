const UserController = require('../controllers/user.controller')
const AuthCheck = require("../middleware/auth")
const ImageController = require("../controllers/image.controller")
const FeedController = require("../controllers/feed.controller")


module.exports = app => {

    app.post("/user/register", UserController.register)
    app.post("/user/login", UserController.login)
    app.get("/user/authCheck", UserController.authCheck)
    app.get("/user/logout", AuthCheck, UserController.logout)


    app.get("/user/getProfile", AuthCheck, UserController.getUser)
    app.post("/user/viewProfile", AuthCheck, UserController.viewProfile)





    //// Friends Section  //////

    app.post("/socialConnection/addFriend", AuthCheck, UserController.addFriend)




    ///////  Image Section ////

    app.post("/imageUpload/profile", AuthCheck, ImageController.profileUpload)




    /////    Feed Section  /////

    app.post("/api/addFeed", AuthCheck, FeedController.addFeed)
    app.get("/api/getFeeds", AuthCheck, FeedController.getFeeds)
    app.put("/api/feeds/addFeedLike", AuthCheck, FeedController.addFeedLike)




    app.get("/test", AuthCheck, (req, res, next) => {
        // console.log("route hit", req.ip)
        // console.log("auth check". req)
        // console.log("req.app.locals",req.app.locals)
        console.log("req.locals", req.locals)
        res.json({ message: "test good, end points working", user: req.locals })
    })

    app.get("/user/all", AuthCheck, UserController.all)

    app.patch("/user/updatebio",AuthCheck, UserController.updateBio)

}