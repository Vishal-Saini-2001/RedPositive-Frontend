import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Form.css';

const Form = () => {

  const navigate = useNavigate();

  const [data,setData] = useState({
    name:"",
    email:"",
    mobile:"",
    hobbie:""
  })

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]:e.target.value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!data.email.includes("@gmail.com"))alert("Enter valid email");
    else if(data.mobile.split("").length<10 || data.mobile.split("").length>10)alert("Enter valid phone number");
    else if(!data.name)alert("Enter name first");
    else if(!data.hobbie)alert("Enter hobbie first");
    else{
      await axios.post("http://localhost:8080/add-data",data)
      .then(res => {
        alert(res.data.msg);
        navigate("/redirect");
      })
      .catch(err => {
        alert(err.response.data.msg);
        navigate("/redirect");
      })
    }
  }
  return (
    <div className="form">
      <div id='box'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter Name' name='name' onChange={handleChange} required/>
          <br />
          <input type="number" placeholder='Enter Phone' name='mobile' onChange={handleChange} required/>
          <br />
          <input type="email" placeholder='Enter email' name='email' onChange={handleChange} required/>
          <br />
          <input type="text" placeholder='Enter Hobbies' name='hobbie' onChange={handleChange} required/>
          <br />
          <button type='submit' className='btn btn-primary mt-4'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default Form