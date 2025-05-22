import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../axiosInstance';
import { baseURL } from '../../config';
import { useGoogleLogin } from '@react-oauth/google';


const Login = () => {
    const Navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const response = await axiosInstance.post(`${baseURL}/auth/login`, values);
            console.log("Response received:", response.data);
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("accessToken", response.data.jwt_token);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("username", response.data.username);
                setTimeout(() => Navigate("/"), 2000);
            }
            else
                toast.error(response.data.message);



        } catch (error) {
            console.error("Axios Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };


    const responseGoogle = async (authResult) => {
        try {
            if (authResult.code) {
                const res = await axios.post(`http://localhost:5000/api/auth/google?code=${authResult.code}`);
                const { token, user } = res.data;

                localStorage.setItem("accessToken", token);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("user-info", JSON.stringify(user));
                Navigate("/");
            } else {
                throw new Error("Google authentication failed");
            }
        } catch (e) {
            console.log("Error while Google Login...", e);
            toast.error("Google login failed");
        }
    };


    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <div className=' min-h-screen bg-[url("./images/background.jpg")] flex flex-col items-center'>
            <Navbar />
            <div className='flex flex-col items-center justify-center mt-20 w-full px-4'>
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                    <Form
                        onFinish={onFinish}
                        className="space-y-4"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        {/* Email */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, type: 'email', message: 'The input is not valid E-mail!' }
                            ]}
                        >
                            <Input className="py-2 px-4 w-full" />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password className="py-2 px-4 w-full" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" htmlType="submit" className="w-92 ml-5 py-3">
                                Submit
                            </Button>
                        </Form.Item>

                        {/* Not Registered? */}
                        <Form.Item className="text-center">
                            <p className="text-gray-600 ml-20">
                                Not registered?
                                <NavLink to="/register" className="text-blue-500 hover:underline ml-2">
                                    Sign Up
                                </NavLink>
                            </p>

                        </Form.Item>
                        <button
                            onClick={googleLogin}
                            className="flex items-center justify-center gap-2 w-full text-[#000] bg-white border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-100 transition mb-4"
                        >
                            <img src="https://developers.google.com/identity/images/g-logo.png" alt="G" className="w-5 h-5" />
                            Continue with Google
                        </button>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
