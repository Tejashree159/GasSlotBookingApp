import React from 'react';

function GasStationDetails({ gasStation }) {
  return (
    <div>
      <h2>{gasStation.name}</h2>
      <p>{gasStation.location}</p>
      {/* Additional details */}
    </div>
  );
}

export default GasStationDetails;

