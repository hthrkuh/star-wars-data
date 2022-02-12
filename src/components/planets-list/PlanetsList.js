import React from "react";
import PlanetBar from "./planet-bar/PlanetBar";

import "./planetList.scss";

const PlanetsList = ({ planetsList }) => {
  const sortedPlanetList = planetsList.sort((a, b) => {
    return a.population - b.population;
  });
  const relativePercentage = 100 / sortedPlanetList.length;

  return (
    <div className="planets-list">
      {sortedPlanetList.map((planet, i) => (
        <PlanetBar key={i} planet={planet} size={(i + 1) * relativePercentage} />
      ))}
    </div>
  );
};

export default PlanetsList;
