import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from "./components/Navbar";
import Login from './pages/Login';
import Register from './pages/Register';
import SlotBookingForm from './pages/SlotBookingForm';
import Home from './pages/Home';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ padding: '0 50px', marginTop: '64px' }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/slotBookingForm" element={<SlotBookingForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
