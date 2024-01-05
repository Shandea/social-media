import Form from "../../../components/block-comps/Form"
import Input from "../../../components/block-comps/Inputs"

import API from "../../../config/api"
import { useNavigate } from 'react-router'

import { connect } from "react-redux"
import { getCreateAcct } from "../../../config/redux/actions/AuthActions"

const LandingPageLogin = ({ authState, getCreateAcct }) => {
  let nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    ///create a regex
    // const checkUser = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*()_+-=[]{}])([A-Za-z0-9_!@#$%^&*()+-={}[]]){8,}/gi
    let { email, password } = authState

    const login = Object.assign({}, { email, password })
    // console.log("dfs", login)
    API.login(login).then(res => {
      if (res.message === "Logged in successfully") {
        nav("/feed")
      }
      else{
        nav("/")
      }
      // console.log("res", res)
    })
  }

  return (
    <div className="container-right" >
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="signIn-form"
        btnText="Log In"
        btnClass="form-btn"
        onClick={getCreateAcct}
        signup="createAcct-btn"
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
      </Form>
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