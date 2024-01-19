const User = require("../models/User.model.js")

const bcrypt = require('bcrypt')
const mongoose = ('mongoose')

const jwt = require('jsonwebtoken')

const SECRET_KEY = require('dotenv')
const cookieParser = require("cookie-parser")


module.exports = {

    register: (req, res) => {
        console.log("register attempt", req.body)
let userNameAttempt = req.body.username
        User.findOne({ email: req.body.email })
            .then(found => {
                // console.log("Duplicate Email Attempt")
                // if (!req.body.password) {
                    //     res.json("Register error, please fill out fields")
                    // }
                    
                    if (found) {
                    console.log("\n\nDuplicate Email Attempt\n\n")
                    res.json({ message: "Duplicate Email" })

                } else {
                    User.findOne({ username: userNameAttempt })
                    .then(found => {
                        console.log('\nFound: \n',found)
                        // if (!req.body.password) {
                            //     res.json("Register error, please fill out fields")
                            // }
                            
                            if (found) {
                            console.log("\n\nDuplicate Username Attempt\n\n")
                            return res.json({ message: "Duplicate Username" })
        
                        } else {
                    const hash = bcrypt.hashSync(req.body.password, 10)
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        location: {
                            city: req.body.location.city,
                            state: req.body.location.state,
                            zipcode: req.body.location.zipcode
                        },
                        // secretAnswer: req.body.secretAnswer,
                        // secretQuestion: req.body.secretQuestion,
                        gender: req.body.gender,
                        birthDate: req.body.birthDate,
                        phone: req.body.phone,
                        firstName: req.body.firstname,
                        lastName: req.body.lastname,
                        profileImg: `/public/default.jpeg`,
                        isOnline: true

                    })
                
                    User.create(newUser)
                        .then(created => {
                            console.log("created User", created)

                            const token = jwt.sign({ userId: created._id, username: created.username }, process.env.SECRET_KEY, { expiresIn: 3600000 })

                            console.log("token", token, created)
                            return res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 }).status(200).json({ message: "Logged in successfully", token: token, user: created })
                            // res.json({ message: "Success", User: created })

                            // on successful reg, give a jwt and auth to site
                        })

                    }
                })


                }
            })
            .catch(err => console.log("err", err))

    },


    login: async (req, res) => {
        console.log("login attempt", req.body)

        try {

            const user = await User.findOne({ email: req.body.email })

            if (!user) {
                console.log("no user clive")
                return res.json({ error: 'Authentication failed' });

            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password)
            console.log("password match boolean", passwordMatch)
            if (!passwordMatch) {
                console.log("shit password boss")
                return res.json({ error: 'Authentication failed' });

            } else {

                console.log("else hit.. log me in")

                user.isOnline = true
                user.save()

                const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: 3600000 })

                console.log("token", token)
                return res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 }).status(200).json({ message: "Logged in successfully", token: token })

                // res.status(200).json({ token });
            }

        }
        catch (error) {
            console.log("catch error hit", error)
            res.json({ error: 'Login failed' });
        }
    },

    logout: (req, res) => {

        ///// ADD isOnline false
        console.log("req-local - logout", req.locals)
        User.findById(req.locals.userId)
            .then(found => {
                found.isOnline = false
                found.save()
            })
            .catch(err => console.log("logout err", err))

        console.log("logging out")
        res.cookie("jwt", "LOGGEDOUT", { expiresIn: new Date(Date.now) }).status(201).json({ "Logged": "Out" })
        // , {
        //     // expires: new Date(Date.now()),
        //     httpOnly: true,
        //     secure: false
        // })
    },
    // hmmm
    authCheck: (req, res) => {
        // console.log("req.heas", req.cookies)
        // console.log("req.cookies.jwt ::::", req.cookies['jwt'])
        if (!req.cookies['jwt']) {
            // console.log("req.cookies", req.cookies)
            // console.log("cookie found")
            // console.log(cookieParser(req.headers.cookie))
            console.log("no cookie")
            res.json({ message: "go away" })

        }
        if (req.cookies['jwt']) {
            console.log("about to verify")
            let decode = jwt.verify(req.cookies['jwt'], process.env.SECRET_KEY)
            console.log("JWT verified", decode)
            if (decode.userId) {

                res.json({ message: "proceed", user: decode })
            } else {
                res.json({ message: "token expired" })
            }
        }
    },

    getUser: (req, res) => {

        console.log("get user HIT", req.locals)
        User.findById(req.locals.userId)
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
    },
    viewProfile: (req, res) => {

        console.log("get user HIT", req.body._id)
        User.findById(req.body._id)
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
    },

    // I notice you use returns in your res.json... I don't ... is there a difference?

    all: (req, res) => {
        User.find({}).populate().exec()
            .then(data => {
                if (!data) {
                    return res.json({ message: "error" })
                } else {
                    return res.json(data)
                }
            })
            .catch(err => console.log(err))
    },

    updateBio: (req, res) => {
        let id = req.locals.userId
        // console.log('\n\n\n\nGRAHAM!!!!!!!!!!!\n\n\n\n')
        User.findById(id).then(data => {

            if (!data) {
                return res.status(400).json({ message: "cannot find user" })
            } else (
                User.findByIdAndUpdate({ _id: id }, req.body, { new: true }).then(data => {
                    return res.status(200).json({ message: "update successful", data })
                })
            )
        })


    },



    addFriend: (req, res) => {
        console.log("adding Friend")
        console.log("Logged In", req.locals.userId, "req-body", req.body)

        let messageId = [req.locals.userId, req.body.id].sort().join("")

        User.findById(req.locals.userId) // Logged In User
            .then(found => {
                console.log("Current User", found.username, "req.body.userId", req.body)
                let filter = found.friends.filter((obj) => obj.userId.toString() === req.body.id.toString())
                console.log("filter", filter)


                if (req.locals.userId !== req.body.id) {



                    if (filter.length) {

                        console.log("if FILTER.length   =>  line 219")

                        if (filter[0].friendStatus == "requested") {
                            console.log("status =  REQUESTED => approved")
                            filter[0].friendStatus = "approved"
                            found.save()
                        } else if (filter[0].friendStatus == "removed") {
                            console.log("status = REMOVED", filter[0].friendStatus)
                            filter[0].friendStatus = "approved"
                            found.save()
                        }
                        ////////////
                        else if
                            (filter[0].friendStatus == "approved") {
                            console.log("requested to remove")
                            filter[0].friendStatus = "removed"
                            found.save()
                        }
                    }

                    User.findById(req.body.id) // friend to add
                        .then(userFound => { // friend to add
                            let filter2 = userFound.friends.filter((obj) => obj.userId.toString() === req.locals.userId.toString())
                            console.log("filter2", filter2)
                            if (filter2.length) {


                                console.log("FILTER 2 length => 245")

                                if (filter2[0].friendStatus === "pending") {
                                    console.log("pending to approved")
                                    filter2[0].friendStatus = "approved"
                                    userFound.save()
                                    // filter2.save()
                                    // socket.emit("addFriend", userFound._id)
                                    // res.json(found)
                                } else if (filter2[0].friendStatus === "removed") {
                                    console.log("approved to removed")

                                    filter2[0].friendStatus = 'approved'
                                    userFound.save()

                                    // res.json(found)

                                }
                                else
                                    if (filter2[0].friendStatus === "approved") {
                                        console.log("approved to removed")
                                        filter2[0].friendStatus = "removed"
                                        userFound.save()

                                //         // filter2.save()
                                //         // socket.emit("addFriend", userFound._id)
                                //         // res.json(found)
                                    }


                            } else if (found.friends.filter((obj) => obj.userId !== userFound._id)) {

                                console.log("NO friends, fresh match")
                                // if FOUND has friend userFound and friend === pending, change ot approved....

                                found.friends.push({
                                    username: userFound.username,
                                    userId: userFound._id,
                                    messageId: messageId,
                                    friendStatus: "pending",
                                    created: new Date(),
                                    firstName: userFound.firstName,
                                    lastName: userFound.lastName,
                                    profileImg: userFound.profileImg
                                })
                                console.log("useerFound-2nd add friend", userFound)
                                console.log("req friends add", req.locals.userId)
                                userFound.friends.push({
                                    username: req.locals.username,
                                    userId: req.locals.userId,
                                    messageId: messageId,
                                    friendStatus: "requested",
                                    created: new Date(),
                                    firstName: found.firstName,
                                    lastName: found.lastName,
                                    profileImg: found.profileImg,
                                })
                                userFound.save()
                                found.save()


                            }


                            res.json(found)


                        })

                } else {
                    console.log("you can't add yourself")

                }
            })
            .catch(err => console.log(err))

    },


    updateUserProfile: (req, res) => {
        let id = req.locals.userId
        User.findById(id).then(data => {

            if (!data) {
                return res.status(400).json({ message: "cannot find user" })
            } else (
                User.findByIdAndUpdate({ _id: id }, req.body, { new: true }).then(data => {

                    return res.status(200).json({ message: "update successful", data })
                })
            )
        })

    },


    socialSearch: (req, res) => {

        // console.log("social search BE", req.query);
        // console.log("social search BE id", req.locals.userId);
        let id = req.locals.userId;
        let queryUsername = req.query.username;
        let queryGender = req.query.gender;
        let queryCity = req.query.city;
        let queryState = req.query.state;
        let queryZipcode = req.query.zipcode;


        User.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ message: "User not found" });
                }
                let filter = { _id: { $ne: id } };
                // console.log("filter find query", filter)
    
                if (queryUsername) {
                    filter.username = queryUsername; 
                }
                if (queryGender) {
                    filter.gender = queryGender; 
                }
                if (queryCity) {
                    filter["location.city"] = queryCity;
                }
                if (queryState) {
                    filter["location.state"] = queryState;
                }
                if (queryZipcode) {
                    filter["location.zipcode"] = queryZipcode;
                }
            
    
                User.find(filter)
                    .then(users => {

                        if (!users) {
                            return res.json({ message: "No users found" });
                        } else {
                            return res.json(users);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).json({ message: "Internal server error" });
                    });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
            });

        // console.log("search friends BE", req.body)
        // console.log("search friends BE", req.locals.userId)
        // let id = req.locals.userId
        // User.findById({ id }).then(data => {
        //     if (!data) {
        //         res.status(400).json({ message: "user error" })
        //     } else {
        //         User.find().then(data => {
        //             res.status(200).json(data)
        //         })
        //     }
        // })

    }



}


// searchUsers: (req, res) => {
//     console.log("searchUsers", req.body)
//     req.body.ageLow ? null : req.body.ageLow = 18
//     req.body.ageHigh ? null : req.body.ageHigh = 80
//     // const {gender, ageLow, ageHigh } = req.body
//     User.find({ gender: req.body.gender })
//         .where("age").gt(req.body.ageLow).lt(req.body.ageHigh)
//         // .exec()

//         .then(users => {
//             console.log("users", users)
//             res.json(users)
//         })