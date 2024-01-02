const path = require('path')
const fs = require('fs')
const Image = require("../models/image.model")
const User = require("../models/User.model")

module.exports = {

    profileUpload: (req, res) => {
        console.log("images-req-profile hit")
        console.log("req.file", req.files)
        console.log("req", req.body)
        console.log("req.locals", req.locals)

        let image = req.files.images

        console.log("image", image)


        image.mv(path.resolve(process.cwd() + `/public/images/${req.locals.userId}/`, image.name), async (error) => {
            if (error) {
                console.log("err.mv", error)
            }

            Image.find({ userId: req.locals.userId })
            .then(found => {
                if (!found.length) {
                    // await Image.create({
                    Image.create({
                        ...req.body,
                        image: `/public/images/${req.locals.userId}/` + image.name,
                        userId: req.locals.userId,
                        username: req.locals.username,
                        type: "profile"
                    })
                    User.findOneAndUpdate({ _id: req.locals.userId }, { profileImg: `/public/images/${req.locals._id}/` + image.name })
                        .then(userFound => {
                            // console.log("foundUser", userFound)
                            res.json({ message: "Good upload" })
                        })

                } else if (found.length && found[0].type == "profile") {
                    console.log("found.length hit")
                    Image.findByIdAndUpdate(found[0]._id, { image: `/public/images/${req.locals.userId}/` + image.name })
                        .then(updated => {


                            User.findOneAndUpdate({ _id: req.locals.userId }, { profileImg: `/public/images/${req.locals.userId}/` + image.name })
                                .then(userFound => {
                                    // console.log("foundUser", userFound)
                                    res.json({ message: "upload Successful", profile: userFound })
                                })
                            // console.log("updated", updated)
                            // res.json({"message": "Image Updated"})
                        }
                        )
                        .catch(err => console.log("update Err", err))
                }

            })
    })
}
}
