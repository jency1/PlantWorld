import { createContext, useContext, useEffect, useState } from "react";

import { NotificationContext } from "../NotificationContext";

export const PlantContext = createContext({
  plants: [],
  totalPages: 0,
  addPlant: (plant) => {},
  getPlantById: (id) => {},
  updatePlantById: (id, updatedData) => {},
  deletePlantById: (id) => {},
  fetchPlants: (page, limit) => {},
});

export function PlantContextProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [totalPlants, setTotalPlants] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const { showNotificaton } = useContext(NotificationContext);

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

  // Load Plants - fetch paginated plants with filters
  async function fetchPlants(
    page = 1,
    limit = 12,
    minPrice = 0,
    maxPrice = 5000,
    searchTerm,
    tag,
    categories,
    availability
  ) {
    try {
      // Constructing query parameters
      let query = `page=${page}&limit=${limit}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;

      if (searchTerm) {
        query += `&search=${encodeURIComponent(searchTerm)}`;
      }

      if (tag.length > 0) {
        query += `&tag=${tag.map(encodeURIComponent).join(",")}`;
      }

      if (categories.length > 0) {
        query += `&category=${categories.map(encodeURIComponent).join(",")}`;
      }

      if (availability.length > 0) {
        query += `&availability=${availability
          .map(encodeURIComponent)
          .join(",")}`;
      }

      // console.log("Fetching with query:", query);

      const response = await fetch(`${BASE_URL}/api/plants/?${query}`);

      if (!response.ok) {
        showNotificaton("Failed to fetch plants.", error);
        throw new Error("Failed to fetch plants");
      }

      const data = await response.json();
      //   console.log("Backend Response:", json);

      const fetchedPlants = data?.data?.plants || [];

      setPlants(fetchedPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
      setError("Unable to fetch plants. Please try again later.");
    }
  }

  // Add Plant
  async function addPlant(enteredPlantData) {
    try {
      const response = await fetch(`${BASE_URL}/api/plants/`, {
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
      const response = await fetch(`${BASE_URL}/api/plants/${id}`, {
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
      const response = await fetch(`${BASE_URL}/api/plants/${id}`, {
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
    totalPages,
    addPlant,
    getPlantById,
    updatePlantById,
    deletePlantById,
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
