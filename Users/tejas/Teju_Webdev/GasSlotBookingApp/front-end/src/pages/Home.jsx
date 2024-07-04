import React from 'react';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Welcome to the Gas Slot Booking App</h1>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Book a Slot" bordered={false}>
            <p>Find and book available slots at your nearest gas stations.</p>
            <Link to="/slotBookingForm">Book Now</Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Login" bordered={false}>
            <p>Access your account to manage your bookings and preferences.</p>
            <Link to="/login">Login</Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Register" bordered={false}>
            <p>Don't have an account? Register now to get started.</p>
            <Link to="/register">Register</Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
