// const path = require('path')
// const fs = require('fs')
// const { Image, Gallery, ImageComment } = require("../models/image.model")
// const User = require("../models/User.model")

// module.exports = {

//     profileUpload: (req, res) => {
//         console.log("images-req-profile hit")
//         console.log("req.file", req.files)
//         console.log("req", req.body)

//         let image = req.files.images

//         console.log("image", image)


//         image.mv(path.resolve(process.cwd() + `/public/images/${req.user._id}/`, image.name), async (error) => {
//             if (error) {
//                 console.log("err.mv", error)
//             }




//         }

// }}

