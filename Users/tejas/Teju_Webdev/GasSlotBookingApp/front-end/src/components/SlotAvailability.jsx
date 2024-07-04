import React from 'react';

function SlotAvailability({ slots }) {
  return (
    <div>
      <h2>Available Slots</h2>
      <ul>
        {slots.map((slot) => (
          <li key={slot._id}>
            <p>{slot.date} - {slot.time}</p>
            {/* Additional slot details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SlotAvailability;
