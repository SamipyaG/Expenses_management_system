import React,{useState,useEffect} from 'react'
import { Form ,Input,message} from "antd";
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'
import Spinner from '../Component/Spinner';

const RegisterPage = () => {
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const handlesubmit=async(value)=>{
        console.log(value)
        try{
            setLoading(true)
            await axios.post('/api/users/register',value)
            message.success("Registration successful")
            setLoading(false)
            
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }catch(error){
            setLoading(false)
            message.error("Something went wrong please try again later")
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
    {loading && <Spinner />}

    <Form layout='vertical' onFinish={handlesubmit}>
        <h1>Register Form</h1>
        <Form.Item label='Name' name="name">
            <Input type='text'/>

        </Form.Item>
        <Form.Item label='email' name="email">
            <Input type='email'/>

        </Form.Item>
        <Form.Item label='password' name="password">
            <Input type='password'/>
             </Form.Item>
        <div className='d-flex justify-content-between'>
            <Link to="/login">Already sign in </Link>
            <button className='btn btn-primary' type='submit'>Register</button>
        </div>


       
    </Form>
</div>


 </>
 )
}

export default RegisterPage