import Form from "../../../components/block-comps/Form"
import Input from "../../../components/block-comps/Inputs"

import React, { useState } from 'react'
import API from "../../../config/api"



const LandingPageLogin = ({ handleRegister }) => {

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
    API.login(login)
  }

  return (
    <div className="container-right" >
  
      <Form
        onSubmit={(e)=>handleSubmit(e)}
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