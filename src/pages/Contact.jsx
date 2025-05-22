import React from 'react';
import Navbar from '../components/Navbar';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const onFinish = async(values) => {
        console.log('Success:', values);
        try {
            const response= await axios.post("http://localhost:5000/api/auth/contact",values);
            console.log(response.data.message);
            if(response.data.success)
            toast.success(response.data.message);
            else
            toast.error(response.data.message);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen bg-[url("./images/contact.png")] flex flex-col items-center bg-[length:100%_100%] '>
            <Navbar />
            <div className='flex flex-col items-center justify-center mt-20 w-full px-4'>
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

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

                        {/* Message */}
                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[{ required: true, message: 'Please enter your message!' }]}
                        >
                            <Input.TextArea className="py-2 px-4 w-full" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" htmlType="submit" className="w-full py-3">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Contact;
