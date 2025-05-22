import axios from 'axios'
import React, { useState } from 'react'

const Practice = async() => {
  try {
    const response=await axios.get("https://bookflow-backend.onrender.com/api/auth/getuser");
    console.log(response);
  } catch (error) {
    
  }
  


  return (
    <div>
        heelo
    </div>
  )
}

export default Practice