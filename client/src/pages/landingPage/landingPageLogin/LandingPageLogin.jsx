import Form from "../../../components/block-comps/Form"
import Input from "../../../components/block-comps/Inputs"

import React, { useState } from 'react'
import API from "../../../config/api"
import { useNavigate } from 'react-router'

import axios from 'axios'

const LandingPageLogin = ({ handleRegister }) => {


  let nav = useNavigate()


  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    return setLogin(log => ({
      ...log,
      [name]: value
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    // API.login(login)

    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login',
      data: login
    })

      .then(res => {

        console.log("login res", res)

        if (res.data.message == "Logged in successfully") {

          console.log("we are in")

          nav("/profile")


        }
      })
      .catch(err => console.log("login err", err))


  }

  return (
    <div className="container-right" >
      {console.log("login state", login)}
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="signIn-form"
        btnText="Log In"
        btnClass="form-btn"
        onClick={() => handleRegister()}
        signup="createAcct-btn"
      >
        <Input
          className="signIn-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          required={true}
        />
        <Input
          className="signIn-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}

          required={true}
        />
      </Form>
    </div >
  )
}


export default LandingPageLogin