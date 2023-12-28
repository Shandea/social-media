import Form from "../../components/block-comps/Form"
import Input from "../../components/block-comps/Inputs"

import axios from 'axios'
import { useState, useEffect } from "react"

const LandingPageSignup = (props) => {

    const [reg, setReg] = useState({
        firstname: "",
        lastname: "",
        username: "",
        contact: "",
        password: "",
        confirmPassword: "",
        location: {
            city: "",
            state: "",
            zipcode: ""
        },
        birthDate: {
            month: "",
            day: "",
            year: ""
        },
        gender: ""

    })

    useEffect(() => {
        console.log(reg)
    }, [reg])

    const handleChange = (e) => {
        let { name, value } = e.target
        return setReg(reg => ({
            ...reg,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        console.log("my state", reg)
        e.preventDefault()

        axios({
            method: 'POST',
            url: 'http://localhost:5000/user/register',
            data: reg
        })
            .then(res => console.log("res", res))
            .catch(err => console.log("err"))
    }

    return (
        <div className="container-right">


            <Form
                onSubmit={(e) => handleSubmit(e)}
                className="signup-form"
                btnText="Sign Up"
                btnClass="signup-form-btn"
                signup="signup-btn"
            >
                <div className="name-div">

                    <Input
                        className="signup-inputs name-div-input"

                        type="text"
                        name="firstname"
                        value={reg.firstname || ""}
                        placeholder="First Name"
                        required={true}
                        onChange={(e) => handleChange(e)}

                    />
                    <Input
                        className="signup-inputs name-div-input"

                        type="text"
                        name="lastname"
                        value={reg.lastname || ""}
                        placeholder="Last Name"
                        required={true}
                        onChange={(e) => handleChange(e)}

                    />

                </div>

                <div className="email-psw-username-div">
                    <Input
                        className="signup-inputs email-psw-username-input"

                        type="text"
                        name="username"
                        placeholder='username'
                        value={reg.username || ""}
                        required={true}
                        onChange={(e) => handleChange(e)}

                    />
                    <Input
                        className="signup-inputs email-psw-username-input"

                        type="text"
                        name="contact"
                        value={reg.contact || ""}
                        placeholder="Email or Phone Number"
                        required={true}
                        onChange={(e) => handleChange(e)}

                    // pattern={ }
                    />
                    <Input
                        className="signup-inputs email-psw-username-input"

                        type="password"
                        name="password"
                        placeholder='Password'
                        value={reg.password || ""}
                        required={true}
                        onChange={(e) => handleChange(e)}

                    />
                    <Input
                        className="signup-inputs email-psw-username-input"

                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={reg.confirmPassword || ""}
                        required={true}
                        onChange={(e) => handleChange(e)}

                    />

                </div>

                <div className="location">
                    <Input
                        className=" location-input"

                        type="text"
                        name="city"
                        value={reg.location.city || ""}
                        placeholder="City"
                        required={true}
                        onChange={(e) => setReg(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))} 

                    />
                    <Input
                        className=" location-input"

                        type="text"
                        name="state"
                        value={reg.location.state || ""}
                        placeholder="State"
                        required={true}
                        onChange={(e) => setReg(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))} 

                    />
                    <Input
                        className=" location-input"

                        type="text"
                        name="zipcode"
                        value={reg.location.zipcode || ""}
                        placeholder="Zipcode"
                        required={true}
                        onChange={(e) => setReg(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))} 

                    />
                </div>
                <label>Birth Date</label>
                <div className="birth-date">
                    <Input
                        className=" birth-date-input"

                        type="text"
                        name="month"
                        value={reg.birthDate.month || ""}
                        placeholder="03/"
                        required={true}
                        onChange={(e) => setReg(prev => ({ ...prev, birthDate: { ...prev.birthDate, [e.target.name]: e.target.value } }))} 

                    />
                    <Input
                        className=" birth-date-input"

                        type="text"
                        name="day"
                        value={reg.birthDate.day || ""}
                        placeholder="30/"
                        required={true}
                        onChange={(e) => setReg(prev => ({ ...prev, birthDate: { ...prev.birthDate, [e.target.name]: e.target.value } }))} 

                    />
                    <Input
                        className=" birth-date-input"

                        type="text"
                        name="year"
                        value={reg.birthDate.year || ""}
                        placeholder="2000"
                        required={true}
                        onChange={(e) => setReg(prev => ({ ...prev, birthDate: { ...prev.birthDate, [e.target.name]: e.target.value } }))} 

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
                            onChange={(e) => handleChange(e)}

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
                            onChange={(e) => handleChange(e)}

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
                            onChange={(e) => handleChange(e)}

                        />

                    </div>
                </div>


            </Form>

        </div>
    )
}

export default LandingPageSignup