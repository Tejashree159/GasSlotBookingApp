import React from 'react';

function GasStationList({ gasStations }) {
  return (
    <div>
      <h2>Gas Stations</h2>
      <ul>
        {gasStations.map((station) => (
          <li key={station._id}>
            <h3>{station.name}</h3>
            <p>{station.location}</p>
            {/* Additional details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GasStationList;
