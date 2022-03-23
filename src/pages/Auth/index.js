import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams,useNavigate} from 'react-router-dom';
import { loginApi } from "../../api/user";
import { toast } from "react-toastify";


const Auth = () => {
let navigate = useNavigate();
const {token} = useParams();
console.log(token,'token');
useEffect(() => {
    localStorage.clear();
    login();
},[]);
const login = async() =>{
    const data = {
        token:token
    }
    let res = await loginApi(data);
    console.log(res,'sssssssssssssssss')
    if (res && res.data && res.data.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem('token',res.data.data.jwt);
        localStorage.setItem('userData',JSON.stringify(res.data.data));
        navigate(`/`);
      } else {
        toast.error(res.data.message);
      }
}
  return (
    <>
    </>
  )
}

export default Auth