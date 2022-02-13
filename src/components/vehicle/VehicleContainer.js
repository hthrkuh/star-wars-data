import React, { useCallback, useEffect, useState } from "react";

import { fetchList, fetchItem } from "../../utils";
import Vehicle from "./Vehicle";

import { STARWARS_URL } from "../../consts/urls";

const VehicleContainer = () => {
  const [mostPopulationPerVehicle, setMostPopulationPerVehicle] =
    useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMostPopulation = useCallback(async () => {
    const vehicles = await getVehiclesList();
    let vehiclesWithMostPopulation = [];
    await vehicles.reduce(async (promise, vehicle) => {
      await promise;
      if (vehicle?.pilots?.length) {
        const vehicleInfo = await getPopulationByPilots(vehicle.pilots);
        vehiclesWithMostPopulation.push({
          vehicleName: vehicle.name,
          ...vehicleInfo,
        })
      }
    }, Promise.resolve());

    console.log(vehiclesWithMostPopulation)
    vehiclesWithMostPopulation.sort(
      (a, b) => b.totalPopulation - a.totalPopulation
    );
    setMostPopulationPerVehicle(vehiclesWithMostPopulation);
    setIsLoading(false);
  }, []);

  const getVehiclesList = async () => {
    const vehiclesList = await fetchList(`${STARWARS_URL}/vehicles`)
    console.log(vehiclesList)
    return vehiclesList;
  };

  const getPopulationByPilots = async (pilots) => {
    let totalPopulationByVehicle = 0;
    const pilotsName = [];
    const homeWorlds = [];

    return await pilots.reduce(async (promise, pilot) => {
      await promise;
      const pilotData = await getPopulationByPilot(pilot);
      totalPopulationByVehicle += pilotData.homeWorld.population;
      pilotsName.push(pilotData.pilotName);
      homeWorlds.push(pilotData.homeWorld);
      return {
        totalPopulation: totalPopulationByVehicle,
        pilotsName,
        homeWorlds,
      };
    }, Promise.resolve());
  };

  const getPopulationByPilot = async (pilotUrl) => {
    const pilotData = await fetchItem(pilotUrl);
    const homeWorld = await fetchItem(pilotData.homeworld);
    const homeWorldPopulation = parseInt(homeWorld.population);

    return {
      pilotName: pilotData.name,
      homeWorld: {
        name: homeWorld.name,
        population: !Number.isNaN(homeWorldPopulation)
          ? homeWorldPopulation
          : 0,
      },
    };
  };

  useEffect(() => {
    getMostPopulation();
  }, [getMostPopulation]);
  // mostPopulationPerVehicle
  return (
    <div>
      {!isLoading ? (
        mostPopulationPerVehicle.map((vehicle, i) => <Vehicle key={i} vehicle={vehicle} isLoading={isLoading} />)
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default VehicleContainer;
