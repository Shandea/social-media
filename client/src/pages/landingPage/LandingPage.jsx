import LandingPageSignup from "./landingPageSignup/landingPageSignup"
import LandingPageLogin from "./landingPageLogin/LandingPageLogin"
import { Link } from 'react-router-dom'

import { useEffect } from "react"
import API from "../../config/api"

import {connect} from "react-redux"

const LandingPage = ({props,authState}) => {
  
  useEffect(()=>{
   API.userAll()
  },[])

  return (
    <>
    <div className="landingPage-container">
      
      <div className="container-left" >
        <h1>SHOW CASE</h1>
        <Link to="/feed" > bypass auth </Link>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, sed! Doloremque quos accusamus maiores sint illum, ea corrupti voluptatem. Dolorem omnis at similique voluptas a eveniet, iste reprehenderit consectetur molestias?</p>
      </div>

      {
        authState.createAcct ? <LandingPageSignup /> : <LandingPageLogin  />
      }
    </div>
    </>
    
  )
}
const mapStateToProps = (state)=>{
  return{
    authState: state.auth
  }
}
export default connect(mapStateToProps,null)(LandingPage)