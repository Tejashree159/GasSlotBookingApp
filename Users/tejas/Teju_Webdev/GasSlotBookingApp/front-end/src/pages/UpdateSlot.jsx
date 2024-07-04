import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
function UpdateSlot() {

    
    const {slotId}= useParams();
    const navigate = useNavigate();
    const [slot, setSlot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);

  useEffect(() => {
    axios.get('/api/slots/${slotId')
    .then(response => setSlot(response.data))
    .catch(error=>message.error('Failed to fetch slot'))
    
    const fetchSlot = async () => {
      try {
        const response = await axios.get(`/api/slots/${slotId}`);
        setSlot(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching slot details');
        setLoading(false);
      }
    };

    fetchSlot();
  }, [slotId]);

  const formData= new FormData();
  for(const key in values){
    if(values.hasOwnProperty(key)){
        formData.append(key,values[key]);
        console.log(key + ":" + values[key]);
    }
  }

  const handleUpdateSlot = async () => {
    try {

      const response = await axios.put(`/api/slots/${slotId}`, { status: 'booked' });
      setSlot(response.data);

      alert('Slot updated successfully!');
    } catch (error) {
     
      alert('Failed to update slot');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!slot) {
    return <p>Slot not found</p>;
  }

  return (
    <div>
      <h2>Update Slot</h2>
      <p>Slot ID: {slot._id}</p>
      <p>Status: {slot.status}</p>
      <button onClick={handleUpdateSlot}>Update Slot</button>
    </div>
  );
};

export default UpdateSlot;
