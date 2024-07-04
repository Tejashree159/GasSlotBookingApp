import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Select, Card, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const SlotBookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user info
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user', { headers: { Authorization: `Bearer ${token}` } });
        setUser(response.data);
      } catch (error) {
        message.error('Failed to load user info');
      }
    };

    // Fetch gas stations
    const fetchStations = async () => {
      try {
        const response = await axios.get('/api/stations');
        setStations(response.data);
      } catch (error) {
        message.error('Failed to load gas stations');
      }
    };

    fetchUser();
    fetchStations();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/bookSlot', {
        userId: user.id,
        stationId: values.station,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data.success) {
        message.success('Slot booked successfully!');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card title="Book a Slot" style={{ width: 400 }}>
        <Form
          name="slotBooking"
          onFinish={onFinish}
        >
          <Form.Item
            name="station"
            rules={[{ required: true, message: 'Please select a gas station!' }]}
          >
            <Select placeholder="Select Gas Station">
              {stations.map((station) => (
                <Option key={station.id} value={station.id}>{station.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker disabledDate={current => current && current < moment().endOf('day')} />
          </Form.Item>

          <Form.Item
            name="time"
            rules={[{ required: true, message: 'Please select a time!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              Book Slot
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default SlotBookingForm;
