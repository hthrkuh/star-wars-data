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
    let vehicleWithMostPopulation = {
      totalPopulation: 0,
    };

    await vehicles.reduce(async (promise, vehicle) => {
      await promise;
      if (vehicle.pilots) {
        const vehicleInfo = await getPopulationByPilots(vehicle.pilots);

        if (
          vehicleInfo?.totalPopulation >
          vehicleWithMostPopulation.totalPopulation
        ) {
          vehicleWithMostPopulation = {
            vehicleName: vehicle.name,
            ...vehicleInfo,
          };
        }
      }
    }, Promise.resolve());

    setMostPopulationPerVehicle(vehicleWithMostPopulation);
    setIsLoading(false);
  }, []);

  const getVehiclesList = async () => {
    const vehiclesList = await fetchList(`${STARWARS_URL}/vehicles`);
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

  return (
    <div>
      {!isLoading ? (
        <Vehicle vehicle={mostPopulationPerVehicle} isLoading={isLoading} />
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default VehicleContainer;
