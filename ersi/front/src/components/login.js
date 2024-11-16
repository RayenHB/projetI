import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, Form, Typography, message } from 'antd';
import 'antd/dist/antd.min.css'; 
import './styles/login.css'; 

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Login successful', data);
        message.success('Login successful!');
        navigate('/profilcli');
      } else {
        message.error(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <Card
        title={<Title level={3} className="text-center login-title">Bienvenu sur 3aresli.tn</Title>}
        className="shadow-card"
      >
        <Form
          onFinish={handleLogin}
          initialValues={{ email, password }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="login-button"
              >
                Login
              </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
