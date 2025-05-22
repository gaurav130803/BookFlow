import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";

const { TextArea } = Input;

const Story = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by looking for the accessToken
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // If the token exists, set to true
  }, []);

  const showModal = () => {
    if (!isLoggedIn) {
      // If the user is not logged in, show a warning and redirect to login
      message.warning("Please login to submit your story.");
      navigate("/login");
      return;
    }
    // If the user is logged in, open the modal
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("accessToken"); // Use accessToken here
      const res = await axios.post("https://bookflow-backend.onrender.com/api/story/add", values, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for backend verification
        },
      });

      if (res.data.success) {
        message.success("Story submitted successfully!");
        form.resetFields();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Story submission failed:", error);
      message.error("Failed to submit story.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Share Your Story</h1>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        <Button
          type="primary"
          size="large"
          onClick={showModal}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-xl"
        >
          Add Your Story
        </Button>

        <Button
          type="default"
          size="large"
          onClick={() => navigate("/allstories")}
          className="bg-white border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-xl"
        >
          View All Stories
        </Button>
      </div>

      {/* Modal Form */}
      <Modal
        title="Submit Your Story"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter story title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true, message: "Please select a genre" }]}
          >
            <Select placeholder="Select genre">
              <Select.Option value="Adventure">Adventure</Select.Option>
              <Select.Option value="Romance">Romance</Select.Option>
              <Select.Option value="Mystery">Thriller</Select.Option>
              <Select.Option value="Horror">Horror</Select.Option>
              <Select.Option value="Fantasy">Fantasy</Select.Option>
              <Select.Option value="Non-Fiction">Non-Fiction</Select.Option>
              <Select.Option value="Sci-Fi">Sci-Fi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Story Content"
            name="content"
            rules={[{ required: true, message: "Please enter your story" }]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit Story
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Story;
