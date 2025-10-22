import React from 'react'
import { Form ,Input} from "antd";
import { Link } from 'react-router-dom';
const RegisterPage = () => {
    const handlesubmit=(value)=>{
        console.log(value)
    }
  return (
<>
<div className='register-page'>

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
            <Link to ="/login">Already sign in </Link>
            <button className='btn btn-primary' type='submit'>Register</button>
        </div>


       
    </Form>
</div>


</>
)
}

export default RegisterPage