import React, { useState } from 'react'
import axios from 'axios'



function Dev() {

    const [reg, setReg] = useState({})

    const handleChange = (e) => {
        setReg(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
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
        <>

            {console.log("reg", reg)}
            <h1>Register</h1>

            <input name="username"
                placeholder='username'
                value={reg.username || ""}
                onChange={(e) => handleChange(e)}
            >
            </input>
            
            <input name="password"
                placeholder='password'
                value={reg.password || ""}
                onChange={(e) => handleChange(e)}
            >
            </input>

            <button onClick={(e) => handleSubmit(e)}>submit</button>



        </>
    )
}

export default Dev