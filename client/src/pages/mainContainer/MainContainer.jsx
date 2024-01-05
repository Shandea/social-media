import "./mainContainer.css";
import Body from "./body/Body";
import Header from "./header/Header";
import { useState } from "react";
// import Footer from "./footer/Footer";

import { connect } from 'react-redux'

const MainContainer = (props) => {
  const [chatFriends,setChatfriends] = useState(false)
const handleShowRightDM = ()=>{
  return setChatfriends(!chatFriends)
}

  return (
    <div className="mcBody">
      <div className="HeaderContainer" >
        {/* header */}
        <Header handleShowRightDM={handleShowRightDM} />

      </div>

      <div className="userTop" >

        <div className="BodyContainer" >
          {/* body */}
          <Body chatFriends={chatFriends} />
          {/* <Outlet /> */}
        </div>

        <div className="FooterContainer">
          {/* footer */}
          {/* <Footer /> */}

        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.warn("WTF", state)
  return {
    authState: state.auth
  }

}

export default connect(mapStateToProps, null)(MainContainer)
