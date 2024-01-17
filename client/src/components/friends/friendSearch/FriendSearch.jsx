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
let [fieldQuery,setFieldQuery] = useState({fields:""})
const [searchQuery, setSearchQuery] = useState('')
const initialValue = 'defaultSearchTerm';

const fetchData = (value) =>{
     axios({
    method: 'get',
    url: `http://localhost:5000/socialConnection/searchFriend?${fieldQuery}=${value}`,
    withCredentials: true
  })
    .then(res => {
      console.log("res", res)
      setData(res.data)
    })
}
useEffect(()=>{
    
   fetchData(initialValue)
    
},[])
const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchData(event.target.value)
  };

    
    return (
        <>
       
        {console.log("input change",data)}
        {console.log("input change search query",searchQuery)}
        {console.log("input change search fields",fieldQuery)}

            <div>FriendSearch</div>
            <p>database query to return users to localstate and render</p>
            <p>search by gender, age, username, location, etc</p>


            <form>

                <div style={quikBorder}>
                    <input onChange={handleSearchChange}  name="search" type="text"  />
                    {/* <button>search</button> */}
                </div>
                {/* 
                need check box for fields
                
            */}
                <div style={quikBorder}>

                    <label>ALL</label>
                    <input onChange={(e)=>setFieldQuery(e.target.value)} name='fields' type="radio" value={"allFields"} />
                    <label>GENDER</label>
                    <input onChange={(e)=>setFieldQuery(e.target.value)} name='fields' type="radio" value={"gender"} />
                    <label>AGE</label>
                    <input onChange={(e)=>setFieldQuery(e.target.value)} name='fields' type="radio" value={"age"} />
                    <label>USERNAME</label>
                    <input onChange={(e)=>setFieldQuery(e.target.value)} name='fields' type="radio" value={"username"} />
                    <label>LOCATION</label>
                    <label>CITY</label>
                    <input onChange={(e)=>setFieldQuery(e.target.value)} name='fields' type="radio" value={"city"} />
                    <label>STATE</label>
                    <input onChange={(e)=>setFieldQuery(e.target.value)} name='fields' type="radio" value={"state"} />
                    <label>ZIPCODE</label>
                    <input onChange={(e)=>setFieldQuery(e.target.value)} name='fields' type="radio" value={"zipcode"} />
                </div>
            </form>

            <div style={quikBorder}>
                <h1>Diplay results</h1>
                {
                    data.map((foundUser,i)=>{
                        return(
                            <div key={foundUser._id}>
                                <h1>{foundUser.username}</h1>
                            </div>
                        )
                    })
                }
            </div>


        </>
    )
}

export default FriendSearch