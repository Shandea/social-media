const User = require("../models/User.model.js")
const { Feeds, Comments } = require("../models/feed.model.js")
const Image = require("../models/Image.model.js")
const path = require('path')
const fs = require("fs")


module.exports = {

    addFeed: (req, res) => {
        console.log("add feed", req.body)
        // console.log("add feed - img", req.body.images)
        console.log("req.files", req.files)

        Feeds.create(req.body)
            .then(created => {
                console.log("created", created)
                if (req.files) {
                    console.log("There is a image file", req.files.images)
                    let image = req.files.images
                    console.log("IMAGE variable", image)
                    image.mv(path.resolve(process.cwd() + `/public/images/feed/${created._id}`, image.name), async (error) => {
                        console.log("error on move - if undefinded.. there is no error", error)
                    })
                    created.imgPath = `/public/images/feed/${created._id}/` + image.name
                }

                console.log("Created Feed ", created)

                created.OgFeed = created._id
                created.save()

                User.findByIdAndUpdate({ _id: created.author }, { $push: { feeds: created._id } })
                    .then(found => {
                        // console.log("found", found)
                    })
                    .catch(err => console.log("Feed create err", err))

                res.json(created)

            })
            .catch(err => console.log("Feed create err 2", err))

    },

    getFeeds: (req, res) => {
        console.log("getFeeds", req.body)
        //// Add aggregation for ppl you follow and sort so newest are at top
        Feeds.find()
            // .populate("comments")
            .populate({
                path: 'comments',
                populate: { path: 'comments', options: { _recursed: true } }
            })
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
            .catch(err => console.log("Feed Get error", err))
    },







}