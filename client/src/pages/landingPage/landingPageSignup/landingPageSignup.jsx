import { useNavigate } from "react-router-dom"
import Form from "../../../components/block-comps/Form"
import Input from "../../../components/block-comps/Inputs"

import API from "../../../config/api"

import { connect } from "react-redux"

import { motion } from 'framer-motion'
const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
}


const LandingPageSignup = ({authState}) => {

let nav = useNavigate()

    const handleSubmit = (e,reg) => {
        console.log("my state", authState)
        e.preventDefault()
    
        //created api folder... check config folder

        // do a regex here
        API.register(authState).then(res => {
            console.log("reg res", res)
            nav("/feed")

        })

    }

    return (
        <div className="container-right">
            <Form
                onSubmit={(e) => handleSubmit(e)}
                className="signup-form"
                btnText="Sign Up"
                btnClass="form-btn"
                signup="signup-btn"
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className='motion-div'
                    variants={dropIn}
                    initial={'hidden'}
                    animate={'visible'}
                    exit={'exit'}
                >

                    <div className="name-div">

                        <Input
                            className="signup-inputs name-div-input"

                            type="text"
                            name="firstname"
                            value={authState.firstname || ""}
                            placeholder="First Name"
                            required={true}
                           
                        />
                        <Input
                            className="signup-inputs name-div-input"

                            type="text"
                            name="lastname"
                            value={authState.lastname || ""}
                            placeholder="Last Name"
                            required={true}
                           
                        />

                    </div>

                    <div className="email-psw-username-div">
                        <Input
                            className="signup-inputs email-psw-username-input"

                            type="text"
                            name="username"
                            placeholder='username'
                            value={authState.username || ""}
                            required={true}
                           

                        />
                        <Input
                            className="signup-inputs email-psw-username-input"

                            type="email"
                            name="email"
                            value={authState.email || ""}
                            placeholder="Email"
                            required={true}
                           
                        />
                        <Input
                            className="signup-inputs email-psw-username-input"

                            type="text"
                            name="phone"
                            value={authState.phone || ""}
                            placeholder="Phone Number"
                            required={true}
                           
                        />
                        <Input
                            className="signup-inputs email-psw-username-input"

                            type="password"
                            name="password"
                            placeholder='Password'
                            value={authState.password || ""}
                            required={true}
                           
                        />
                        <Input
                            className="signup-inputs email-psw-username-input"

                            type="password"
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            value={authState.confirmPassword || ""}
                            required={true}
                           
                        />

                    </div>

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
                    </div>
                    <label>Birth Date</label>
                    <div className="birth-date">
                        <Input
                            className=" birth-date-input"

                            type="text"
                            name="birthDate.month"
                            value={authState.birthDate.month || ""}
                            placeholder="03/"
                            required={true}

                        />
                        <Input
                            className=" birth-date-input"

                            type="text"
                            name="birthDate.day"
                            value={authState.birthDate.day || ""}
                            placeholder="30/"
                            required={true}

                        />
                        <Input
                            className=" birth-date-input"

                            type="text"
                            name="birthDate.year"
                            value={authState.birthDate.year || ""}
                            placeholder="2000"
                            required={true}

                        />
                    </div>

                    <div className="gender">
                        <div className="signup-radio">

                            <label htmlFor="" >Female</label>
                            <Input
                                className=""

                                type="radio"
                                name="gender"
                                value="female"
                                required={true}
                               

                            />

                        </div>

                        <div className="signup-radio">

                            <label htmlFor="" >Male</label>

                            <Input
                                className=""

                                type="radio"
                                name="gender"
                                value="male"
                                required={true}
                               

                            />

                        </div>

                        <div className="signup-radio">

                            <label htmlFor="" >Other</label>

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

            </Form>

        </div >
    )
}

const mapStateToProps=(state)=>{
    return {
        authState:state.auth
    }
}

export default connect(mapStateToProps,null)(LandingPageSignup)