import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
const quikBorder = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    margin: "10px",
}

const FriendSearch = () => {
let [data,setData] = useState([])
let [records,setRecords] = useState("")

useEffect(()=>{
    axios({
        method: 'get',
        url: 'http://localhost:5000/user/all',
        withCredentials: true
      })
        .then(res => {
          console.log("res", res)
          setData(res.data)
        })
    
},[])

    
    return (
        <>
       
        {console.log("input change",data)}

            <div>FriendSearch</div>
            <p>database query to return users to localstate and render</p>
            <p>search by gender, age, username, location, etc</p>


            <form>

                <div style={quikBorder}>
                    <input  name="search" type="text"  />
                    <button>search</button>
                </div>
                {/* 
                need check box for fields
                
            */}
                <div style={quikBorder}>

                    <label>ALL</label>
                    <input name='fields' type="radio" value={"allFields"} />
                    <label>GENDER</label>
                    <input name='fields' type="radio" value={"gender"} />
                    <label>AGE</label>
                    <input name='fields' type="radio" value={"age"} />
                    <label>USERNAME</label>
                    <input name='fields' type="radio" value={"username"} />
                    <label>LOCATION</label>
                    <label>CITY</label>
                    <input name='fields' type="radio" value={"city"} />
                    <label>STATE</label>
                    <input name='fields' type="radio" value={"state"} />
                    <label>ZIPCODE</label>
                    <input name='fields' type="radio" value={"zipcode"} />
                </div>
            </form>

            <div style={quikBorder}>
                <h1>Diplay results</h1>
            </div>


        </>
    )
}

export default FriendSearch