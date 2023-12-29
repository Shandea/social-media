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
                            res.json({ message: "Success", User: created })

                            // on successful reg, give a jwt and auth to site
                        })
                }
            })
            .catch(err => console.log("err", err))
        // .then(() => {
        // console.log("new user attempt", newUser)



        // })
    },


    login: (req, res) => {
        console.log("login attempt", req.body)

        User.find({ email: req.body.email })
            .then(found => {
                console.log("found", found)
                if (!found.length) {
                    res.json("Invalid Login")
                } else {
                    res.json("User Authenticated")
                }
            })
            .catch(err => console.log("Er", err))
    },

    all: (req,res)=>{
            User.find({}).populate().exec()
            .then(data =>{
                if(!data){
                    return res.json({message:"error"})
                }else{
                    return res.json(data)
                }
            })
            .catch(err=>console.log(err))
    } 

    
}




