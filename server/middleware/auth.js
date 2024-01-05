

const jwt = require("jsonwebtoken")


module.exports = (req, res, next) => {
    console.log('auth check', req.cookies)
    try {
        const token = req.cookies['jwt']

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log("decoded", decoded)
        const userId = decoded.userId
        console.log("userId decoded", userId)
        if (userId.length) {
            console.log("if is good", decoded.username)
            // req.user = decoded
            req.locals = decoded
            // console.log("req.user", req.user)
            next()

        }
    }
    catch {
        console.log("CATCH HIT")
    }
}


// authCheck: (req, res) => {
//     console.log("req.heas", req.cookies)
//     console.log("req.cookies.jwt ::::", req.cookies['jwt'])
//     if (!req.cookies['jwt']) {
//         // console.log("req.cookies", req.cookies)
//         // console.log("cookie found")
//         // console.log(cookieParser(req.headers.cookie))
//         console.log("no cookie")
//         res.json({ message: "go away" })

//     }
//     if (req.cookies['jwt']) {
//         console.log("about to verify")
//         let decode = jwt.verify(req.cookies['jwt'], process.env.SECRET_KEY)
//         console.log("JWT verified", decode)
//         if (decode.userId) {

//             res.json({ message: "proceed", user: decode })
//         }else {
//             res.json({message: "token expired"})
//         }
//     }