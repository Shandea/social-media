const User = require("../models/User.model")
const Messages = require("../models/messaging.model")

module.exports = {

    addMessage: (req, res) => {
        console.log("adding Message", req.locals.userId, req.body.recipient)

        Messages.create(req.body)
            .then(created => {
                console.log("created", created)
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
                                recent: created.messageContent
                            })
                            foundUser.save()
                            console.log("no found ID")

                        } else {

                            console.log(" id found")
                            foundUser.messages.find((item) => item.queryId === created.queryId ?
                                (
                                    item.messages.push(created._id),
                                    item.recent = created.messageContent
                                )
                                : null
                            )
                            foundUser.save()
                            console.log("foundUser saved?")
                        }
                    })
                    .catch(err => console.log("addmessage err", err))
            })

    },



    getThreadMessages: (req, res) => {
        console.log("getting thread messages", req.body.queryId, req.locals.userId)
       
       let queryId
        if(req.body.queryId.length !== 48){
            console.log("creating queryid")
            queryId = [req.body.queryId, req.locals.userId].sort().join("")
        }else {
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
                        // console.log("wtf", item)
                        item.messageCount = item.messages.length,
                        item.recent = ""

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