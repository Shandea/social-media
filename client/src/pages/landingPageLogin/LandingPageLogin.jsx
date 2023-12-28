import Form from "../../components/block-comps/Form"
import Input from "../../components/block-comps/Inputs"

import React, { useState } from 'react'
import axios from 'axios'

const LandingPageLogin = (props) => {
  // console.log("sfgsfgdfgdfg",props.handleRegister)
  // let handleRegister = props.handleRegister

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    console.log(e.target.name)
    setLogin(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login',
      data: login
    })
      .then(res => console.log("res", res))
      .catch(err => console.log("err", err))
  }

  return (
    <div className="container-right" >
      {console.log("login", login)}

      <div className="signIn-form">

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

        <button
          className="form-btn"
          onClick={(e) => handleSubmit(e)}

        >Log in</button>
        <hr className="form-hr" />

        <br />
        <br />


        <button
          className="createAcct-btn"
          onClick={props.handleRegister}
        >Create Account</button>




      </div>


      {/* <Form
        onSubmit={() => ("")}
        className="signIn-form"
        btnText="Log In"
        btnClass="form-btn"
        // onClick={() => handleRegister()}
        signup="createAcct-btn"
      > */}
      {/* <Input
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
        /> */}

      {/* <button>dd</button> */}
      {/* </Form> */}



    </div>
  )
}



export default LandingPageLogin