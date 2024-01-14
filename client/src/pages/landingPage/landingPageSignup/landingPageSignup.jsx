import { useNavigate } from "react-router-dom";
import Form from "../../../components/block-comps/Form";
import Input from "../../../components/block-comps/Inputs";
import React, { useState } from "react"; //added this, may just use redux store for comparison though -graham
import API from "../../../config/api";
import { getCreateAcct } from "../../../config/redux/actions/AuthActions";
import { connect } from "react-redux";
import { AiFillQuestionCircle } from "react-icons/ai";

import { motion } from "framer-motion";
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const LandingPageSignup = ({ authState, getCreateAcct }) => {
  let nav = useNavigate();

  const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/; // one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.
  const emailRegex = /^\S+@\S+\.\S+$/; // cuts spaces, no domain, ensures period

  const handleSubmit = (e, reg) => {
    console.log("my state", authState);
    e.preventDefault();

    //created api folder... check config folder

    // this line is to make the phone number straight numbers. Gotta rember to format it other places -graham
    authState.phone = authState.phone.replace(/[^\d]/g, "");

    API.register(authState).then((res) => {
      console.log("reg res", res);
      if (res.message == "Logged in successfully") {
        nav("/feed");
      }
    });
  };

  return (
    <div className="container-right">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="signup-form"
        signup="signup-btn"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="motion-div"
          variants={dropIn}
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
        >
         
          <div className="signupheader"><h1>Sign Up</h1></div>
          <hr  className="line"/>
          <div className="name-div">
            <Input
              className="input3"
              type="text"
              name="firstname"
              value={authState.firstname || ""}
              placeholder="First Name"
              required={true}
            />
            <Input
              className="input3"
              type="text"
              name="lastname"
              value={authState.lastname || ""}
              placeholder="Last Name"
              required={true}
            />
          </div>

          <div className="uppc">
            <Input
              className="input4"
              type="text"
              name="username"
              placeholder="username"
              value={authState.username || ""}
              required={true}
            />
            <Input
              className="input4"
              type="email"
              name="email"
              value={authState.email || ""}
              placeholder="Email"
              required={true}
            />

            <p>
              {emailRegex.test(authState.email) || authState.email=="" ? null : "Bad Email"}
            </p>

            <Input
              className="input4"
              type="text"
              name="phone"
              value={authState.phone || ""}
              placeholder="Phone Number"
              required={true}
            />
            <Input
              className="input4"
              type="password"
              name="password"
              placeholder="Password"
              value={authState.password || ""}
              required={true}
            />

            <p>
              {passRegex.test(authState.password) || authState.password == ""
                ? null
                : "Badd Pass"}
            </p>

            <Input
              className="input4"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={authState.confirmPassword || ""}
              required={true}
            />
            <p>
              {authState.password == authState.confirmPassword
                ? null
                : "Passwords Don't Match"}
            </p>
          </div>
          <div className="local">Location<AiFillQuestionCircle className="q-icon"/></div>
          <div className="location">
          
            <Input
              className=" location-input"
              type="text"
              name="location.city"
              value={authState.location.city || ""}
              placeholder="City"
              required={true}
            />
            <Input
              className=" location-input"
              type="text"
              name="location.state"
              value={authState.location.state || ""}
              placeholder="State"
              required={true}
            />
            <Input
              className=" location-input"
              type="text"
              name="location.zipcode"
              value={authState.location.zipcode || ""}
              placeholder="Zipcode"
              required={true}
            />
      
            <p>
              {authState.location.zipcode.length == 5 ||
              authState.location.zipcode == ""
                ? null
                : "Please use 5 digit zipcode"}
            </p>
          </div>
          <label className="BD-label">Birth Date<AiFillQuestionCircle className="q-icon"/></label>
          <div className="birth-date">
            <Input
              className=" birth-date-input"
              type="text"
              name="birthDate.month"
              value={authState.birthDate.month || ""}
            //   placeholder="03"
              required={true}
              maxLength="2"
            />
            <Input
              className=" birth-date-input"
              type="text"
              name="birthDate.day"
              value={authState.birthDate.day || ""}
            //   placeholder="30"
              required={true}
              maxLength="2"
            />
            <Input
              className=" birth-date-input"
              type="text"
              name="birthDate.year"
              value={authState.birthDate.year || ""}
            //   placeholder="2000"
              required={true}
              maxLength="4"
            />
            <p>
              {authState.birthDate.month > 12 || authState.birthDate.month < 1
                ? "Use a real month please"
                : null}
            </p>
            <p>
              {authState.birthDate.day > 32 || authState.birthDate.month < 1
                ? "Use a real day please"
                : null}
            </p>
            <p>
              {authState.birthDate.year.length > 4
                ? "Please use 4 digits for year"
                : null}
            </p>
          </div>
<div className="gen">Gender<AiFillQuestionCircle className="q-icon"/></div>
          <div className="gender">
            <div className="signup-radio">
              <label htmlFor="">Female</label>
              <Input
                className=""
                type="radio"
                name="gender"
                value="female"
                required={true}
              />
            </div>

            <div className="signup-radio">
              <label htmlFor="">Male</label>

              <Input
                className=""
                type="radio"
                name="gender"
                value="male"
                required={true}
              />
            </div>

            <div className="signup-radio">
              <label htmlFor="">Other</label>

              <Input
                className=""
                type="radio"
                name="gender"
                value="other"
                required={true}
              />
            </div>
          </div>
        </motion.div>

        {/* THIS PART MUST BE UNCOMMENTED. temporarily commented out for our convenience */}

        {/* 
{
passRegex.test(authState.password) &
emailRegex.test(authState.email)  &
authState.birthDate.year.length==4 &
authState.firstname.length>0 &
authState.lastname.length>0 &
authState.username.length>0 & 
authState.phone.length>9
 ? <button type="submit" className="form-btn" >Sign Up</button> : <button type="submit" className="form-btnBAD" disabled='true'>Something Wrong</button>} */}

        {/* you gott get rid of tis line VVV for deployment */}

        <button type="submit" className="formbtn">
          Sign Up
        </button>

        <hr className="form-hr" />
        <button
          onClick={getCreateAcct}
          className="formbtn"
          type="button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCreateAcct: () => dispatch(getCreateAcct()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPageSignup);
