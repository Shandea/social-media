const User = require("../models/User.model")
const Messages = require("../models/messaging.model")

module.exports = {

    addMessage: (req, res) => {
        console.log("adding Message", req.locals.userId, req.body.recipient)

        Messages.create(req.body)
            .then(created => {
                console.log("created", created)
                console.log("created MsgContent", created.messageContent)
                User.findById(req.body.recipient) // find Recipient 
                    .then(foundUser => {
                        // console.log("FoundUser", foundUser)
                        // foundUser.messages.push("WTF")
                        if (!foundUser.messages.find((item) => item.queryId == created.queryId)) {
                            foundUser.messages.push({
                                queryId: created.queryId,
                                userId: created.sender,
                                senderName: created.senderName,
                                messages: [created._id],
                                messageCount: 0,
                                profileImg: created.profileImg,

                                recent: created.messageContent,
                                createdAt: created.createdAt,
                                fromUser: req.locals.username
                                

                            })
                            foundUser.save()
                            console.log("no found ID")


                            User.findById(req.locals.userId)
                            .then(user => {
                                user.messages.push({
                                queryId: created.queryId,
                                userId: foundUser._id,
                                senderName: foundUser.username,
                                messages: [created._id],
                                messageCount: 0,
                                profileImg: foundUser.profileImg,

                                recent: created.messageContent,
                                createdAt: created.createdAt,
                                fromUser: req.locals.username
                                

                            })
                                    user.save()
                                    console.log("foundUser saved?")
                            })









                        } else {

                            console.log(" id found")
                            foundUser.messages.find((item) => item.queryId === created.queryId ?
                                (
                                    item.messages.push(created._id),
                                    item.createdAt = created.createdAt,
                                    item.recent = created.messageContent,
                                    item.fromUser = req.locals.username

                                )
                                : console.log(" ==== line 37 msg controller ERROR")
                            )
                            foundUser.save()
                            console.log("foundUser saved?")
                        }
                    })
                    .catch(err => console.log("addmessage err", err))

/////////////  add below to have same msg in recent for each user

                User.findById(req.locals.userId)
                    .then(user => {

                             console.log("USER found")
                            user.messages.find((item) => item.queryId === created.queryId ?
                                (
                                    item.messages.push(created._id),
                                    item.createdAt = created.createdAt,
                                    item.recent = created.messageContent,
                                    item.fromUser = req.locals.username
                                )
                                : console.log(" ==== line 53 msg controller ERROR")
                            )
                            user.save()
                            console.log("foundUser saved?")
                    })
            })

    },



    getThreadMessages: (req, res) => {
        console.log("getting thread messages", req.body.queryId, req.locals.userId)

        let queryId
        if (req.body.queryId.length !== 48) {
            console.log("creating queryid")
            queryId = [req.body.queryId, req.locals.userId].sort().join("")
        } else {
            queryId = req.body.queryId
        }
        console.log("server side query", queryId)

        Messages.find({ queryId: queryId })
            .then(messages => {
                console.log("msg res", messages)
                User.findById(req.locals.userId)
                    .then(found => {
                        // console.log("found", found)
                        found.messages.find((item) => item.queryId === queryId ?
                            (
                                // console.log("wtf msg find ln 84", item)
                                item.messageCount = item.messages.length
                                // item.recent = ""

                            )
                            : null
                        )
                        found.save()

                    })

                res.json(messages)
            })



    },

    getAllMessages: (req, res) => {
        // console.log("getAllmessgae", req.body)
        console.log("Getting All messages", req.locals.userId)
        // Messages.find({ queryId: req.body.queryId })
        Messages.aggregate([
            {
                $match:
                    { recipient: req.locals.userId }
            },
            // {
            //     $project: { 
            //         senderName: 1,
            //         recipient: 1
            //     }
            // },
            {
                $group: {
                    _id: { sender: '$senderName', id: '$sender' },
                    ///  add new message [] here for accurate count

                }
            },
        ])
            .then(msgs => {
                // console.log("allMsgs", msgs)
                res.json(msgs)
            })

    },


    getUser: (req, res) => {
        console.log("get user", req.params.id)
        User.findById(req.params.id)
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
            .catch(err => console.log("err"))
    }

    // deleteAllMessages: (req, res) => {
    //     console.log("del all msg", req.params.id, "req.user", req.user._id)


    //     Messages.updateMany({ queryId: req.params.id },
    //         {
    //             $addToSet: { "deleted": req.user._id }
    //         }, {new: true})
    //         .then(updated => res.json(updated))
    //         .catch(err => console.log("updateErr", err))

    // },



}