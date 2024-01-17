import { useNavigate } from "react-router-dom";
import Form from "../../../components/block-comps/Form";
import Input from "../../../components/block-comps/Inputs";
import React, { useState } from "react"; //added this, may just use redux store for comparison though -graham
import API from "../../../config/api";
import { getCreateAcct } from "../../../config/redux/actions/AuthActions";
import { connect } from "react-redux";
import { AiFillQuestionCircle } from "react-icons/ai";
import { handleInputsAuth } from "../../../config/redux/actions/AuthActions";

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

const LandingPageSignup = ({ authState, getCreateAcct, handleInputsAuth }) => {
  let nav = useNavigate();

  const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/; // one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.
  const pass1 = /\d/; //has a number
  const pass2 = /(?=.*[a-z])/; //has a lowercase
  const pass3 = /(?=.*[A-Z])/; //has a uppercase
  const pass4 = /(?=.*\W)/; //has a symbol
  const pass5 = /^.{8,16}$/; //has between 8 and 16 char

  const emailRegex = /^\S+@\S+\.\S+$/; // cuts spaces, no domain, ensures period
  const nameRegex = /^.{4,12}$/;
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\S\s.-]\d{3}[\s.-]\d{4}$/;
  const zipregex = /\d{5}/;
  // EXAMPLE INLINE STYLING VALIDATION
  // style={{ border : validation ? 'none' : solid red 1px}}

  const handleSubmit = (e, reg) => {
    console.log("my state", authState);
    e.preventDefault();

    //created api folder... check config folder

    // this line is to make the phone number straight numbers. Gotta rember to format it other places -graham
    authState.phone = authState.phone.replace(/[^\d]/g, "");
    console.warn("AUTHSTATE BEING SENT:\n", authState);
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
          <div className="signupheader">
            <p>
              Sign Up{" "}
              <button
                style={{ fontSize: "xx-large" }}
                onClick={getCreateAcct}
                className="x"
                type="button"
              >
                ❌
              </button>
            </p>
          </div>
          <hr className="line" />
          <div className="name-div">
            <Input
              className="input3"
              type="text"
              name="firstname"
              value={authState.firstname || ""}
              placeholder="First Name"
              required={true}
              maxLength="12"
              style={
                authState.firstname.length > 2 ||
                authState.firstname.length == 0
                  ? { border: "solid 1px grey" }
                  : { border: "red solid 3px" }
              }
              // style={authState.firstname.length>3 ? { border : 'solid green 5px !important'} : { border : 'solid red 4px !important'}}

              // style={{ border : authState.firstname.length>3 ? 'solid green 5px !important' : 'solid red 4px !important'}}
            />
            <Input
              className="input3"
              type="text"
              name="lastname"
              value={authState.lastname || ""}
              placeholder="Last Name"
              required={true}
              maxLength="12"
              style={
                authState.lastname.length > 3 || authState.lastname.length == 0
                  ? { border: "solid 1px grey" }
                  : { border: "red solid 3px" }
              }
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
              maxLength="15"
              style={{ border: "1px solid grey" }}
            />
            <Input
              className="input4"
              type="email"
              name="email"
              value={authState.email || ""}
              placeholder="Email"
              required={true}
              style={
                emailRegex.test(authState.email) || authState.email.length == 0
                  ? { border: "solid 1px grey" }
                  : { border: "red solid 3px" }
              }
            />

            <p
              style={{
                color: "red",
              }}
            >
              {emailRegex.test(authState.email) || authState.email == ""
                ? null
                : "Bad Email"}
            </p>

            <Input
              className="input4"
              type="text"
              name="phone"
              value={authState.phone || ""}
              placeholder="Phone Number"
              required={true}
              style={
                phoneRegex.test(authState.phone) || authState.phone.length == 0
                  ? { border: "solid 1px grey" }
                  : { border: "red solid 3px" }
              }
            />

            <Input
              className="input4"
              type="password"
              name="password"
              placeholder="Password"
              value={authState.password || ""}
              required={true}
            />

            <p
              style={{
                color: "red",
              }}
            >
              {passRegex.test(authState.password) || authState.password == ""
                ? null
                : "Bad Pass"}
            </p>
            {/* 
            style={{
  textDecoration: completed ? 'line-through' : 'none'
}} */}

            <p>Pass Word Contains:</p>
            <p
              style={{
                color: pass1.test(authState.password) ? "green" : "red",
              }}
            >
              -a number
            </p>
            <p
              style={{
                color: pass2.test(authState.password) ? "green" : "red",
              }}
            >
              -a lowercase
            </p>
            <p
              style={{
                color: pass3.test(authState.password) ? "green" : "red",
              }}
            >
              -an uppercase
            </p>
            <p
              style={{
                color: pass4.test(authState.password) ? "green" : "red",
              }}
            >
              -a symbol
            </p>
            <p
              style={{
                color: pass5.test(authState.password) ? "green" : "red",
              }}
            >
              -between 8 and 16 characters
            </p>

            <Input
              className="input4"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={authState.confirmPassword || ""}
              required={true}
              style={
                authState.password == authState.confirmPassword ||
                authState.confirmPassword.length == 0
                  ? { border: "solid 1px grey" }
                  : { border: "red solid 3px" }
              }
            />
            <p style={{ color: "red" }}>
              {authState.password == authState.confirmPassword
                ? null
                : "Passwords Don't Match"}
            </p>
          </div>
          <div className="local">
            Location
            <AiFillQuestionCircle className="q-icon" />
          </div>
          <div className="location">
            <Input
              className=" location-input"
              type="text"
              name="location.city"
              value={authState.location.city || ""}
              placeholder="City"
              required={true}
              maxLength="20"
            />
            <Input
              className=" location-input"
              type="text"
              name="location.state"
              value={authState.location.state || ""}
              placeholder="State"
              required={true}
              maxLength="2"
            />
            <Input
              className=" location-input"
              type="text"
              name="location.zipcode"
              value={authState.location.zipcode || ""}
              placeholder="Zipcode"
              required={true}
              style={
                zipregex.test(authState.location.zipcode) ||
                authState.location.zipcode.length == 0
                  ? { border: "solid 1px grey" }
                  : { border: "red solid 3px" }
              }
            />

            {/* <p style={{ color: "red" }}>
              {authState.location.zipcode.length == 5 ||
              authState.location.zipcode == ""
                ? null
                : "Please use 5 digit zipcode"}
            </p> */}
          </div>
          <label className="BD-label">
            Birth Date
            <AiFillQuestionCircle className="q-icon" />
            Month - Day - Year
          </label>
          <div className="birth-date">
            <Input
              className=" birth-date-input"
              type="text"
              name="birthDate.month"
              value={authState.birthDate.month || ""}
              //   placeholder="03"
              required={true}
              maxLength="2"
              style={{
                border:
                  authState.birthDate.month > 12 ||
                  authState.birthDate.month < 1
                    ? "solid red 1px"
                    : "solid grey 1px",
              }}
            />

            <Input
              className=" birth-date-input"
              type="text"
              name="birthDate.day"
              value={authState.birthDate.day || ""}
              //   placeholder="30"
              required={true}
              maxLength="2"
              style={{
                border:
                  authState.birthDate.day > 31 || authState.birthDate.day < 1
                    ? "solid red 1px"
                    : "solid grey 1px",
              }}
            />

            <Input
              className=" birth-date-input"
              type="text"
              name="birthDate.year"
              value={authState.birthDate.year || ""}
              //   placeholder="2000"
              required={true}
              maxLength="4"
              style={{
                border:
                  authState.birthDate.year > 2024 ||
                  authState.birthDate.year < 1920
                    ? "solid red 1px"
                    : "solid grey 1px",
              }}
            />
          </div>
          <div
            className="gen"
            onClick={(e) => console.log("GENDER: \n", authState.gender)}
          >
            Gender
            <AiFillQuestionCircle className="q-icon" />
          </div>
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
authState.password == authState.confirmPassword  &
emailRegex.test(authState.email)  &
authState.birthDate.year.length==4 &
authState.firstname.length>0 &
authState.lastname.length>0 &
authState.username.length>0 & 
authState.phone.length>9 &
authState.gender != "" 
 ? <button type="submit" className="formbtn" >Sign Up</button> : <button type="submit" className="form-btnBAD" disabled='true'>Something Wrong</button>} */}

        {/* you gott get rid of tis line VVV for deployment */}

        <button type="submit" className="formbtn">
          Sign Up
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
    handleInputChange: (input) => dispatch(handleInputsAuth(input)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPageSignup);
