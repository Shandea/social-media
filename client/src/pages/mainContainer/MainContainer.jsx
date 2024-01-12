import "./mainContainer.css";
import Body from "./body/Body";
import Header from "./header/Header";
// import Footer from "./footer/Footer";

import { connect } from 'react-redux'

const MainContainer = (props) => {

  return (
    <div>
     
        {/* header */}
        <Header />
   

   

      
          {/* body */}
          <Body  />
          {/* <Outlet /> */}
       

      
          {/* footer */}
          {/* <Footer /> */}

     

     
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.warn("WTF", state)
  return {
    authState: state.auth
  }

}

export default connect(mapStateToProps, null)(MainContainer)
