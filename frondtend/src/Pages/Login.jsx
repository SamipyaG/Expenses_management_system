import React,{useState,useEffect} from 'react'
import { Form ,Input,message} from "antd";
import { Link,Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Component/Spinner';
const Login = () => {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const handlesubmit=async(values)=>{
        console.log(values)
        try{
            setLoading(true)
            const {data}=await axios.post("/api/users/login",values)
            message.success("User successfully login")
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
            setLoading(false)
            
            setTimeout(() => {
                navigate('/')
            }, 1000)

        }catch(error){
            setLoading(false)
            message.error("Something went wrong please login later")
        }
    }
     //prevent for login user
            useEffect(()=>{
                if(localStorage.getItem('user'))
                {
                    navigate("/")
                }
            },[navigate])
  return (
    <>
    <div className='register-page'>
        {loading && <Spinner/>}

    <Form layout='vertical' onFinish={handlesubmit}>
        <h1>Login Form</h1>
        

        
        <Form.Item label='email' name="email">
            <Input type='email'/>

        </Form.Item>
        <Form.Item label='password' name="password">
            <Input type='password'/>
             </Form.Item>
        <div className='d-flex justify-content-between'>
            <Link to="/register">Register</Link>
            <button className='btn btn-primary' type='submit'>Login</button>
        </div>


       
    </Form>
</div>

    </>
  )
}

export default Login