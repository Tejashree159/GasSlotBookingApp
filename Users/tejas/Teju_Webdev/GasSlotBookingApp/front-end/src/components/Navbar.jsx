import React from 'react';
import {Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';

const {Header} = Layout;

const Navbar = () => {
  return (
    <Header>
      <div className='logo'/>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
      <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>
      <Menu.Item key="4"><Link to="/SlotBookingForm">SlotBooking</Link></Menu.Item>
      <Menu.Item key="5"><Link to="/UpdateSlot">UpdateSlot</Link></Menu.Item>
      </Menu>
    </Header>    
  )
}

export default Navbar;
