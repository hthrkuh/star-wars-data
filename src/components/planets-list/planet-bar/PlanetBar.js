import React from "react";

import "./planetBar.scss";

const PlanetBar = ({ planet, size }) => {
  const barHeight = {
    height: `${size / 2}vh`,
  };

  return (
    <div className="bar-container">
      <div>{planet.population}</div>
      <div style={barHeight} className="bar"></div>
      <div>{planet.name}</div>
    </div>
  );
};
export default PlanetBar;
