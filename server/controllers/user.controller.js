const User = require("../models/User.model.js")

const bcrypt = require('bcrypt')
const mongoose = ('mongoose')

const jwt = require('jsonwebtoken')

const SECRET_KEY = require('dotenv')


module.exports = {

    register: (req, res) => {
        console.log("register attempt", req.body)

        User.findOne({ username: req.body.username })
            .then(found => {
                console.log("found", found)
                // if (!req.body.password) {
                //     res.json("Register error, please fill out fields")
                // }

                if (found) {
                    res.json({ message: "Registration Error" })

                } else  {

                    const hash = bcrypt.hashSync(req.body.password, 10)
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        location: {
                            city: req.body.location.city,
                            state: req.body.location.state,
                            zipcode: req.body.zipcode
                        },
                        secretAnswer: req.body.secretAnswer,
                        secretQuestion: req.body.secretQuestion,
                        gender: req.body.gender,
                        birthdate: req.body.birthday

                    })
                    User.create(newUser)
                        .then(created => {
                            console.log("created User", created)
                            res.json({ message: "Success", user: created })

                            // on successful reg, give a jwt and auth to site
                        })
                }
            })
            .catch(err => console.log("err", err))
            // .then(() => {
            // console.log("new user attempt", newUser)



            // })
    },






}




