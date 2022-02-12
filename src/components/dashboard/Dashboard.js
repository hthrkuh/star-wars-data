import React, { useState, useEffect, useCallback } from "react";

import "./dashboard.scss";

import { STARWARS_URL } from "../../consts/urls";
import { fetchList } from "../../utils";
import PlanetsList from "../planets-list/PlanetsList";

const Dashboard = () => {
  const [planetsList, setPlanetList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const planetsToCompare = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

  const getPlanetsList = useCallback(async () => {
    const allPlanets = await fetchList(`${STARWARS_URL}/planets`);
    const filterdPlanets = allPlanets.filter((planet) =>
      planetsToCompare.includes(planet.name)
    );
    setPlanetList(filterdPlanets);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPlanetsList();
  }, [getPlanetsList]);

  return !isLoading ? (
    <PlanetsList planetsList={planetsList} />
  ) : (
    <h1>Loading</h1>
  );
};

export default Dashboard;
