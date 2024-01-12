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

                    image.name = image.name.replace(" ", '_')


                    console.log("IMAGE variable", image)
                    image.mv(path.resolve(process.cwd() + `/public/images/feed/${created._id}`, image.name), async (error) => {
                        console.log("error on move - if undefinded.. there is no error", error)
                    })
                    created.imgPath = `/public/images/feed/${created._id}/` + image.name
                }


                ///// add to put author img on feed container.. later we do so its always updated img


                User.findById(req.locals.userId)
                    .then(user => {
                        console.log("user who added feed", user)
                        
                        console.log("Created Feed ", created)
                        
                        created.OgFeed = created._id
                        created.authorImg = user.profileImg
                        created.save()
                        
                    })
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


    addFeedLike: (req, res) => {
        console.log("req body ADD Like", req.body, "reqlocal-userId", req.locals.userId)
        Feeds.findById(req.body.id)
            .then(found => {
                console.log("found feed", found)

                // when ready to restrict votes to one user
                // if (!found.likedBy.includes(req.locals.userId)) {

                found.likes += 1
                found.likedBy.push(req.locals.userId)
                found.save()

                User.findByIdAndUpdate({ _id: found.author },
                    {
                        $push: {
                            notifications: [
                                {
                                    like: {
                                        likedDoc: found._id,
                                        user: req.locals.username,
                                        userId: req.locals.userId,
                                        createdAt: new Date(),
                                        ogFeed: found.OgFeed
                                    }
                                }
                            ]
                        }
                    })

                    .then(res.json(found))
                    .catch(err => console.log("add like ERROR", err))
                // } else {
                //     res.json({message: "You have already voted"})
                // }
            })
    },

    searchFeed: (req, res) => {
        console.log("searching feeds  =>  ", req.params)
        let {search} = req.params

        Feeds.find({ feedContent: { $regex: search, $options: 'i' } })
        .populate({
            path: 'comments',
            populate: { path: 'comments', options: { _recursed: true } }
        })
        .then(found => {
            console.log("found search", found)
            res.json(found)
        })    }


    // Messages.aggregate([
    //     {
    //         $match:
    //             { recipient: req.user._id }
    //     },
    //     // {
    //     //     $project: { 
    //     //         senderName: 1,
    //     //         recipient: 1
    //     //     }
    //     // },
    //     {
    //         $group: {
    //             _id: { sender: '$senderName', id: '$sender' },
    //             ///  add new message [] here for accurate count

    //         }
    //     },
    // ])




}