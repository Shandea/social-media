import "./mainContainer.css";
import Body from "./body/Body";
import Header from "./header/Header";
// import Footer from "./footer/Footer";

import { connect } from 'react-redux'

const MainContainer = (props) => {

  return (
    <div className="mcBody">
      <div className="HeaderContainer" >
        {/* header */}
        <Header />

      </div>

      <div className="userTop" >


        <div className="BodyContainer" >
          {/* body */}
          <Body />
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
