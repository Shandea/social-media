const User = require("../models/User.model.js")

const bcrypt = require('bcrypt')
const mongoose = ('mongoose')

const jwt = require('jsonwebtoken')

const SECRET_KEY = require('dotenv')
const cookieParser = require("cookie-parser")


module.exports = {

    register: (req, res) => {
        console.log("register attempt", req.body)

        User.findOne({ username: req.body.username })
            .then(found => {
                console.log("found", found)
                if (!req.body.password) {
                    res.json("Register error, please fill out fields")
                }

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
                        lastName: req.body.lastname

                    })
                    User.create(newUser)
                        .then(created => {
                            console.log("created User", created)

                            const token = jwt.sign({ userId: created._id, username: created.username }, process.env.SECRET_KEY)

                            console.log("token", token, created)
                            return res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 }).status(200).json({ message: "Logged in successfully", token: token, user: created })
                            // res.json({ message: "Success", User: created })

                            // on successful reg, give a jwt and auth to site
                        })
                }
            })
            .catch(err => console.log("err", err))
        // .then(() => {
        // console.log("new user attempt", newUser)



        // })
    },


    login: async (req, res) => {
        console.log("login attempt", req.body)

        try {

            const user = await User.findOne({ email: req.body.email })

            if (!user) {
                console.log("no user clive")
                return res.status(401).json({ error: 'Authentication failed' });

            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password)
            console.log("password match boolean", passwordMatch)
            if (!passwordMatch) {
                console.log("shit password boss")
                return res.status(401).json({ error: 'Authentication failed' });

            } else {

                console.log("else hit.. log me in")

                const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY)

                console.log("token", token)
                return res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 }).status(200).json({ message: "Logged in successfully", token: token })

                // res.status(200).json({ token });
            }

        }
        catch (error) {
            console.log("catch error hit", error)
            res.status(500).json({ error: 'Login failed' });
        }
    },
// hmmm
    authCheck: (req, res) => {
        console.log("req.heas", req.cookies)
        console.log("req.cookies.jwt ::::", req.cookies['jwt'])
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
            }else {
                res.json({message: "token expired"})
            }
        }
    },



    // User.findOne({ email: req.body.email })
    //     .then(found => {
    //         console.log("found", found, req.body.password)
    //         if (!found) {

    //             console.log("login - NO USER")

    //             res.json({ error: 'Authentication failed' });

    //         } else if (!bcrypt.compare(found.password, req.body.password)) {

    //             console.log("login BAD PASSWORD", req.body.password)

    //             return res.status(401).json({ error: 'Authentication failed' });

    //         } else if (bcrypt.compare(req.body.password === found.password)) {
    //             // const passwordMatch = await bcrypt.compare(password, user.password);
    //             console.log("PASSWORD MATCH")

    //             const token = jwt.sign({ userId: found._id, username: found.username }, process.env.SECRET_KEY)

    //             console.log("good login token:", token)

    //             // attach to cookie here

    //             res.status(200).json({ token })
    //         }
    //     })
    // .catch(err => {

    //     console.log("Er", err)
    //     res.status(500).json({ error: 'Login failed' });

    // })


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




