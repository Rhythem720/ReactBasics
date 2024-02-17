import React ,{useContext}from 'react'
import UserContext from '../context/UserContext'

function Profile() {
      //useContext hook takes the particular context on which we have states that we want to use it
    const {user} =useContext(UserContext)

    console.log(user)
  if(!user) return <div>Please Login</div>
  
  return <div>Welcome {user.username}</div>
}

export default Profile