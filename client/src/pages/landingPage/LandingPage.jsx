import LandingPageSignup from "../landingPageSignup/landingPageSignup"
import LandingPageLogin from "../landingPageLogin/LandingPageLogin"
import { Link } from 'react-router-dom'

import { useState } from "react"

const LandingPage = (props) => {

  let [createAcct, setCreateAcct] = useState(false)

  const handleRegister = () => {

    return setCreateAcct(true)

  }

  return (
    <div className="landingPage-container">
      <div className="container-left" >
        <h1>Company Name</h1>
        <Link to="/main" > bypass auth </Link>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, sed! Doloremque quos accusamus maiores sint illum, ea corrupti voluptatem. Dolorem omnis at similique voluptas a eveniet, iste reprehenderit consectetur molestias?</p>
      </div>

      {
        createAcct ? <LandingPageSignup /> : <LandingPageLogin handleRegister={handleRegister} />
      }
    </div>
  )
}

export default LandingPage