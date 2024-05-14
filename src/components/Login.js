import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axiosInstance'

// first point of contact for user as this component will show at front page 
const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({ username: "", password: "" })
  const [error, setError] = useState(false)

  //this function will executed when user will click on submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    try {
      const response = await axiosInstance.post('/auth/login', { ...data, expiresInMins: 30 })

      const { token } = response.data;

      // Store the token in local storage or state
      //So, these lines of code are responsible for managing the authentication state of the user locally and redirecting them to the homepage after successful login.

      localStorage.setItem('token', token);
      localStorage.setItem('login', true);
      navigate('/home')
      console.log('Login successful');

    } catch (error) {
      console.log("-=-=-=-=-=->", error.response.data.message, error)
      setError(error.response.data.message)
    }
  }

  // for changing values in input field

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px", alignItems: "center" }}>
      <div style={{ height: "300px", width: "400px", backgroundColor: "lightblue", border: "2px solid", padding: "40px" }}>

        <label >User Name</label> <br />
        <input type='text' name='username' value={data.username} placeholder='Enter Your Name here' onChange={handleChange} /><br />

        <label>Password</label> <br />
        <input type='password' name='password' value={data.password} placeholder='Enter Password here' onChange={handleChange} /><br /> <br />
        <p>{error ? <p>{error}</p> : ""}</p>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Login;