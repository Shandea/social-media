const User = require("../models/User.model.js")

const bcrypt = require('bcrypt')
const mongoose = ('mongoose')

const jwt = require('jsonwebtoken')

const SECRET_KEY = require('dotenv')
const cookieParser = require("cookie-parser")


module.exports = {

    register: (req, res) => {
        console.log("register attempt", req.body)

        User.findOne({ email: req.body.email })
            .then(found => {
                console.log("found user")
                // if (!req.body.password) {
                //     res.json("Register error, please fill out fields")
                // }

                if (found) {
                    res.json({ message: "Registration Error" })

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
                        profileImg: `/public/default.jpeg`

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
         res.cookie("jwt", "LOGGEDOUT", {expiresIn: new Date(Date.now)}).status(201).json({"Logged": "Out"})
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
    }


}




