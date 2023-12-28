import Form from "../../components/block-comps/Form"
import Input from "../../components/block-comps/Inputs"

const landingPageSignup = (props) => {
    return (
        <div className="container-right">


            <Form
                onSubmit={() => ("")}
                className="signup-form"
                btnText="Sign Up"
                btnClass="signup-form-btn"
                signup="signup-btn"
            >
                <div className="name-div">

                    <Input
                        className="signup-inputs"

                        type="text"
                        name=""
                        // value=""
                        placeholder="First Name"
                        required={true}
                    />
                    <Input
                        className="signup-inputs"

                        type="text"
                        name=""
                        // value=""
                        placeholder="Last Name"
                        required={true}
                    />

                </div>

                <div className="email-psw-username-div">
                    <Input
                        className="signup-inputs"

                        type="text"
                        name=""
                        // value=""
                        placeholder="Username"
                        required={true}
                    />
                    <Input
                        className="signup-inputs"

                        type="text"
                        name=""
                        // value=""
                        placeholder="Email or Phone Number"
                        required={true}
                    // pattern={ }
                    />
                    <Input
                        className="signup-inputs"

                        type="password"
                        name=""
                        // value=""
                        placeholder="Password"
                        required={true}
                    />

                </div>

                <div className="birth-date">
                    <Input
                        className="signup-inputs"

                        type="number"
                        name=""
                        // value=""
                        placeholder="03"
                        required={true}
                    />
                    <Input
                        className="signup-inputs"

                        type="number"
                        name=""
                        // value=""
                        placeholder="30"
                        required={true}
                    />
                    <Input
                        className="signup-inputs"

                        type="number"
                        name=""
                        // value=""
                        placeholder="2000"
                        required={true}
                    />
                </div>

                <div className="gender">
                    <div className="signup-radio">

                        <label htmlFor="" >Female</label>
                        <Input
                            className="signup-inputs"

                            type="radio"
                            name=""
                            value="female"
                            required={true}
                        />

                    </div>

                    <div className="signup-radio">

                    <label htmlFor="" >Male</label>

                        <Input
                            className="signup-inputs"

                            type="radio"
                            name=""
                            value="male"
                            required={true}
                        />

                    </div>

                    <div className="signup-radio">

                    <label htmlFor="" >Other</label>

                        <Input
                            className="signup-inputs"

                            type="radio"
                            name=""
                            value="other"
                            required={true}
                        />

                    </div>
                </div>


            </Form>

        </div>
    )
}

export default landingPageSignup