import "./mainContainer.css";
import Body from "./body/Body";
import Header from "./header/Header";
// import Footer from "./footer/Footer";

const MainContainer = (props) => {
  return (
    <>
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
    </>
  );
};

export default MainContainer;
