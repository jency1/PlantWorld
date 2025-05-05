import { createContext, useEffect, useState } from "react";

export const PlantContext = createContext({
  plants: [],
  addPlant: (plant) => {},
  getPlantById: (id) => {},
  updatePlantById: (id, updatedData) => {},
  deletePlantById: (id) => {},
  totalPages: 0,
  fetchPlants: (page, limit) => {},
});

export function PlantContextProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [totalPlants, setTotalPlants] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch total plants
  useEffect(() => {
    async function fetchTotalPlants() {
      try {
        const response = await fetch(`${BASE_URL}/api/plants/plantTotal`);
        if (!response.ok) {
          throw new Error("Failed to fetch total plant count.");
        }

        const json = await response.json();
        const count = json.totalPlants || 0;

        setTotalPlants(count);
        setTotalPages(Math.ceil(count / 12));
      } catch (err) {
        console.error("Error fetching total plant count:", err);
        setError("Unable to fetch plant count. Please try again later.");
      }
    }

    fetchTotalPlants();
  }, [BASE_URL]);

  // Load Plants - fetch paginated plants
  async function fetchPlants(page = 1, limit = 12) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/plants/?page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to fetch plants");

      const json = await response.json();
      //   console.log("Backend Response:", json);
      const fetchedPlants = json?.data?.plants || [];

      setPlants(fetchedPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
      setError("Unable to fetch plants. Please try again later.");
    }
  }

  // Add Plant
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

  // Get Plant By Id
  function getPlantById(id) {
    return plants.find((plant) => plant._id === id);
  }

  // Update Plant
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
        prevPlants.map((plant) =>
          plant._id === id ? { ...plant, ...updatedPlant } : plant
        )
      );
    } catch (error) {
      console.error("Error updating plant:", error);
      setError("Unable to update plant. Please try again later.");
    }
  }

  // Delete Plant
  async function deletePlantById(id) {
    try {
      const response = await fetch(`http://localhost:8000/api/plants/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }

      setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.error("Error deleting plant:", error);
      setError("Unable to delete plant. Please try again later.");
    }
  }

  // Provide all values via context
  const contextValue = {
    plants: plants,
    addPlant,
    getPlantById,
    updatePlantById,
    deletePlantById,
    totalPages,
    fetchPlants,
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
