import React, { useState } from 'react'
import axios from 'axios'
import "./ImageUpload.css"

import { useNavigate } from 'react-router-dom'

const ImageUpload = () => {
let nav = useNavigate()
    const [selectedFile, setSelectedFile] = useState([])

    const handleSelectedFiles = (e) => {
        setSelectedFile(e.target.files)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submiting', selectedFile)
        const formData = new FormData()
        for (const file of selectedFile) {
            formData.append('images', file)
        }

        // do I need the axios.defaults...   look into this
        axios({
            method: "POST",
            url: "http://localhost:5000/imageUpload/profile",
            data: formData,
            headers: { 'Content-Type': "multipart/form-data" },

            withCredentials: true
        })
            .then(res => {
                console.log("ers", res)
                // handleUpdateProfile(res.data.profile)
                // nav("/profile")

            })
            .catch(err => console.log(err))
    }


    return (
        <>
        {/* {console.log("formdata", formData)} */}
        {console.log("dsag", selectedFile)}

            <form onSubmit={handleSubmit} className='updatepicform'>
<label htmlFor="" className='editlabel'>
    <p className='z'>Upload Photo</p>
                <input
                    type="file"
                    onChange={(e) => handleSelectedFiles(e)}
                    accept="image/*"
                    id="image"
                    name="image"></input></label>
                <button type="submit" className='updatepic'>Update Photo</button>

            </form>




        </>
    )

}

export default ImageUpload