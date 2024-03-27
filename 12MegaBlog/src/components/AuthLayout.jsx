import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Authlayout is for Mecanism to protect the pages/routes
export default function Protected({
    children,authentication=true
}) {
    const navigate=useNavigate()
    const [loader, setLoader] = useState(true)
    const authstatus = useSelector(state=>state.auth.status)
    useEffect(()=>{
        //todo- make it more easy to understand
        // if (authstatus) navigate("/");
        // else navigate("/login");

        if(authentication&& authentication!==authstatus)
        {
            navigate("/login")
        }
        else if(!authentication && authentication!==authstatus)
        {
            navigate("/")
        }
        setLoader(false)
    },[authstatus,navigate,authentication])
 
    
  return loader ? <h1>Loading....</h1>:<>{children}</>
}

