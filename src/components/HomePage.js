import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axiosInstance'

// this component is for when we get  valid access token 

const HomePage = () => {
  const [show, setShow] = useState(null)

  const response = async (e) => {
    try {

  //  this way we are getting response from api

      const response = await axiosInstance.get('/auth/me')
      setShow(response.data)
      console.log('Login successful', response.data );
    } catch (error) {
      console.log("-=-=-=->", error, error.message)
    }
  }

  // for showing the output when this component got rendered first time

  useEffect(() => {
    response()
  }, [])

  return (

    <div style={{ border: "2px solid" }}>
      <h1>{show?.username}</h1>
      <h1>{show?.birthDate}</h1>
      <h1>{show?.bloodGroup}</h1>
    </div>

  )
}

export default HomePage