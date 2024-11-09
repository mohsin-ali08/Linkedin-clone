import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { auth, db } from '../components/firebaseConfig'; // Adjust the path to your firebase configuration
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import loginSVG from '../assets/Loginbg.svg'; // Adjust the path as necessary

const Login = () => {
  const [form] = Form.useForm(); // Form instance for resetting fields
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (isLogin) {
        // Handle login
        await signInWithEmailAndPassword(auth, values.email, values.password);
        message.success('Login successful!');
        form.resetFields(); // Clear form fields after login
        navigate('/'); // Redirect to Home after successful login
      } else {
        // Handle signup
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // Save user info in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          username: values.username,
          email: values.email,
        });

        message.success('Signup successful! Please log in.');
        form.resetFields(); // Clear form fields after signup
        setIsLogin(true); // Switch to login form after successful signup
      }
    } catch (error) {
      message.error(error.message); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row justify-center bg-gray-100">
      {/* Form Container */}
      <div className="flex flex-col justify-center items-center w-full max-w-lg p-8 bg-white shadow-lg">
        <Form
          form={form} // Link form instance to Form component
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="w-full bg-gray-100 shadow-md rounded px-5 py-5"
        >
          <h2 className="text-2xl text-center font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
          {!isLogin && (
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input className="py-2 mt-3" prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input className="py-2" prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password className="py-2" prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="float-right" href="/">
              Forgot password?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-blue-600 font-semibold text-white py-5"
              htmlType="submit"
              block
              loading={loading} // Show loading state on button
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </Button>
          </Form.Item>

          <div className="text-center">
            <span>{isLogin ? 'Not a member?' : 'Already a member?'}</span>
            <Button
              className="hover:underline"
              type="link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </Button>
          </div>
        </Form>
      </div>

      {/* Image Container for Larger Screens */}
      <div className="md:flex md:flex-1 md:justify-center md:items-center bg-gray-200">
        <img src={loginSVG} alt="Login Background" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
