import Form from "../../../components/block-comps/Form"
import Input from "../../../components/block-comps/Inputs"

import API from "../../../config/api"
import { useNavigate } from 'react-router'

import { connect } from "react-redux"
import { getCreateAcct } from "../../../config/redux/actions/AuthActions"
import React, {useState} from 'react'

import io from 'socket.io-client'


const socket = io.connect('http://localhost:5000')


const LandingPageLogin = ({ authState, getCreateAcct }) => {
  let nav = useNavigate()
  let [errorMsg, setErrorMsg] = useState("")

  // let loginMsg = ""

  const handleSubmit = (e) => {
    e.preventDefault()

    ///create a regex
    // const checkUser = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*()_+-=[]{}])([A-Za-z0-9_!@#$%^&*()+-={}[]]){8,}/gi
    let { email, password } = authState


    const login = Object.assign({}, { email, password })
    // console.log("dfs", login)
    API.login(login).then(res => {
      if (res.message === "Logged in successfully") {
        socket.emit("loggedIn", "loggedIn")

        nav("/feed")
      }else{
        setErrorMsg("Something went bad")
        // console.log('error hit')
      }
    })
  }

  return (
    <div className="container-right" >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="signIn-form"

      >
        <Input
          className="signIn-input"
          type="email"
          name="email"
          placeholder="Email"
          required={true}
        />
        <Input
          className="signIn-input"
          type="password"
          name="password"
          placeholder="Password"
          required={true}
        />
         <button type="submit" className="formbtn1" >Log In</button>
         <p>{errorMsg}</p>
        <hr className="form-hr" />
        <button onClick={getCreateAcct} className="createAcct-btn" type="button">Create New Account</button>
      </form>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    authState: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCreateAcct: () => dispatch(getCreateAcct())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPageLogin)