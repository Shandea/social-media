

const Inputs = (props) => {
    return (
        <input
            className={props.className}
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            required={props.required}
            maxLength={props.maxLength}
            minLength={props.minLength}
            min={props.min}
            max={props.max}
            step={props.step}
            checked={props.checked}
        />
    )
}

export default Inputs



/* <input
                    type="text"
                    placeholder="UserName"
                    required
                    name="username"
                    style={{ border: validUserName(register.username) || register.username === "" ? null : "red solid 1px" }}

                    value={register.username}
                    onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} />
                    
                    
                    const [register, setRegister] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        location: {
            city: "",
            state: "",
            zipcode: ""
        },
        secretQuestion: "",
        secretAnswer: "",
        age: "",
        gender: "",
    })
                    */