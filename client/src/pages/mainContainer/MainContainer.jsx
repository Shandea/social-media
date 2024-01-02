import "./mainContainer.css";
import React from "react";
// import LeftSideNav from "../leftSideNav/LeftSideNav";
import Body from "./body/Body";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router";

import { connect } from "react-redux";


const MainContainer = (props) => {
  return (

    <div className="userTop" style={{ display: 'flex', flexDirection: 'column' }}>

      <div id="HeaderContainer" style={{ height: '10%' }}>
        {/* header */}
        <Header />

      </div>

      <div id="BodyContainer" style={{ height: '80%' }}>
        {/* body */}
        <Body />
        {/* <Outlet /> */}
      </div>

      <div id="FooterContainer">
        {/* footer */}
        {/* <Footer /> */}
      
      </div>


      {/* <div className="left">
        <LeftSideNav />
      </div>

      <div className="mid"></div>

      <div className="right"></div> */}

    </div>
  );
};

const mapStateToProps = (state) =>{
  console.log("mainContainer logg", state)
  return{
    authState:state.auth
  }
}



export default connect(mapStateToProps,null)(MainContainer);
