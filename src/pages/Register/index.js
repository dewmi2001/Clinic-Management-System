import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import {  Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";




function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
     
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/");
        }
      }, []);

  return (
    <div className =" h-screen bg-primary flex items-center justify-center p-3" style={{paddingTop:"100px"}}>
      <div className="authentication-form bg-white p-3 rounded">
      
        <Form layout="vertical" onFinish={onFinish}>
         
        <h1 className='text-primary text-2xl font-bold ' style={{ textAlign: "center" }}>Register</h1>
               <hr></hr>
               <div style={{ height: "20px" }}></div>
         
        <Form.Item label="Name"  name="name" rules={[{ required: true, message: ' Name is required' }]} >
                  <Input type="text" placeholder=' Name' />
               </Form.Item>

               <Form.Item label="Email" name="email" rules={[{ required: true, message: 'E-Mail is required' }]}>
                  <Input type="email" placeholder='email' />
               </Form.Item>

               <Form.Item  label="Phone Number" name="phone" rules={[{ required: true, message: ' Phone Number is required' }]}>
                  <Input type="number" placeholder='number' />
               </Form.Item>

               <Form.Item  label="Password"name="password" rules={[{ required: true, message: ' Password is required' }]}>
                  <Input type="password" placeholder='password' />
               </Form.Item>
         
        

          <div className="text-center mt-2 flex flex-col gap-1">
            <Button title="Register" type="submit" />
            <Link to="/login" className="text-primary text-sm underline">
              Already have an account? Click Here To Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );

}
export default Register;
