import { createContext, useEffect, useState } from "react";

export const PlantContext = createContext({
  plants: [],
  addPlant: (plant) => {},
  getPlantById: (id) => {},
  updatePlantById: (id, updatedData) => {},
  deletePlantById: (id) => {},
});

export function PlantContextProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlants() {
      const response = await fetch("http://localhost:8000/api/plants/");
      if (!response.ok) {
        throw new Error("Failed to fetch plants");
      }
      // const plantsData = await response.json();
      const { data } = await response.json();
      console.log("Plants Data: ", data);

      setPlants(data);
    }

    loadPlants();
  }, []);

  async function addPlant(enteredPlantData) {
    try {
      const response = await fetch("http://localhost:8000/api/plants/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enteredPlantData),
      });

      if (!response.ok) {
        throw new Error("Failed to create plant");
      }

      const savedPlant = await response.json();
      setPlants((prevPlants) => [savedPlant, ...prevPlants]);
    } catch (error) {
      console.error("Error adding plant:", error);
      setError("Unable to add plant. Please try again later.");
    }
  }

  function getPlantById(id) {
    return plants.find((plant) => plant.id === id);
  }

  async function updatePlantById(id, updatedData) {
    try {
      const response = await fetch(`http://localhost:8000/api/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update plant");
      }

      const updatedPlant = await response.json();
      setPlants((prevPlants) =>
        prevPlants.map((plant) => (plant.id === id ? updatedPlant : plant))
      );
    } catch (error) {
      console.error("Error updating plant:", error);
      setError("Unable to update plant. Please try again later.");
    }
  }

  async function deletePlantById(id) {
    try {
      const response = await fetch(`http://localhost:8000/api/plants/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }

      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    } catch (error) {
      console.error("Error deleting plant:", error);
      setError("Unable to delete plant. Please try again later.");
    }
  }

  const contextValue = {
    plants: plants,
    addPlant,
    getPlantById,
    updatePlantById,
    deletePlantById,
  };

  return (
    <PlantContext.Provider value={contextValue}>
      {children}
      {error && (
        <p className="text-red-700 bg-red-200 p-4 mt-4 rounded-md border border-red-400">
          {error}
        </p>
      )}
    </PlantContext.Provider>
  );
}
