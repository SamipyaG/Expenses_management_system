import React from 'react'
import { Form ,Input} from "antd";
import { Link } from 'react-router-dom';
const Login = () => {
    const handlesubmit=(values)=>{
        console.log(values)
    }
  return (
    <>
    <div className='register-page'>

    <Form layout='vertical' onFinish={handlesubmit}>
        <h1>Login Form</h1>
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
            <Link to ="/register">Register </Link>
            <button className='btn btn-primary' type='submit'>Register</button>
        </div>


       
    </Form>
</div>

    </>
  )
}

export default Login