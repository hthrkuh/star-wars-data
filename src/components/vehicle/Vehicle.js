import React from "react";

import "./vehicle.scss";

const Vehicle = ({ vehicle }) => {
  const { vehicleName, pilotsName, homeWorlds } = vehicle;
  return (
    <div className="table-container">
      Vehicle name with the largest population sum:
      <div className="title">{vehicleName}</div>
      <div className="home-world-header">
        <span>Home World Name</span> | <span>Home World Population</span>
      </div>
      {homeWorlds.map((homeWorld, i) => (
        <div key={i} className="home-world">
          <div>{homeWorld.name}</div>  :  <div>{homeWorld.population}</div>
        </div>
      ))}
      <div className="pilots">

        <span>Related pilot names:</span>
        <ul>
          {pilotsName && pilotsName.map((name, i) => (
            <li key={name + i}>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>



    </div>
  );
};

export default Vehicle;
