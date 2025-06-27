import { createContext, useContext, useEffect, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { AdminAuthContext } from "../context/ADMIN/AdminAuthContext";

export const PlantContext = createContext({
  plants: [],
  totalPages: 0,
  fetchPlants: (page, limit) => {},
  getPlantById: (id) => {},
  addPlant: (plant) => {},
  updatePlantById: (id, updatedData) => {},
  deletePlantById: (id) => {},
  fetchAllPlants: () => {},
});

export function PlantContextProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [totalPlants, setTotalPlants] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const { showNotification } = useContext(NotificationContext);
  const { isAdminLoggedIn, adminToken } = useContext(AdminAuthContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch total plant count
  useEffect(() => {
    async function fetchTotalPlants() {
      try {
        const response = await fetch(`${BASE_URL}/api/plants/plantTotal`);

        if (!response.ok) {
          throw new Error("Failed to fetch total plant count");
        }

        const json = await response.json();
        const count = json.totalPlants || 0;

        setTotalPlants(count);
        setTotalPages(Math.ceil(count / 12));
      } catch (err) {
        console.error("Error fetching total plant count:", err);
        setError("Unable to fetch plant count. Please try again later.");
        showNotificaton("Unable to fetch plant count", "error");
      }
    }

    fetchTotalPlants();
  }, [BASE_URL]);

  // Fetch paginated plant list with filters
  async function fetchPlants(
    page = 1,
    limit = 12,
    minPrice = 0,
    maxPrice = 5000,
    searchTerm,
    tag = [],
    categories = [],
    availability = []
  ) {
    try {
      let query = `page=${page}&limit=${limit}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;

      if (searchTerm) {
        query += `&search=${encodeURIComponent(searchTerm)}`;
      }
      if (tag.length) {
        query += `&tag=${tag.map(encodeURIComponent).join(",")}`;
      }
      if (categories.length) {
        query += `&category=${categories.map(encodeURIComponent).join(",")}`;
      }
      if (availability.length) {
        query += `&availability=${availability
          .map(encodeURIComponent)
          .join(",")}`;
      }

      const response = await fetch(`${BASE_URL}/api/plants/?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch plants");
      }

      const data = await response.json();

      setPlants(data?.data?.plants || []);
    } catch (err) {
      console.error("Error fetching plants:", err);
      setError("Unable to fetch plants. Please try again later.");
      showNotificaton("Failed to load plant data", "error");
    }
  }

  // Get Plant by ID
  function getPlantById(id) {
    return plants.find((plant) => plant._id === id);
  }

  //Fetch All Plants - Admin Only
  async function fetchAllPlants() {
    try {
      const response = await fetch(
        `${BASE_URL}/api/plants?limit=10000000000000000`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch all plants");
      }

      const data = await response.json();
      // console.log("Admin Plants Fetched data : ", data);
      // showNotification("Loaded all plants successfully", "success");

      setPlants(data?.data?.plants || []);
    } catch (err) {
      console.error("Error fetching all plants:", err);
      showNotification("Failed to load all plants", "error");
    }
  }

  // Add Plant - Admin Only
  async function addPlant(enteredPlantData) {
    if (!isAdminLoggedIn) {
      showNotification("Unauthorized: Admin access required", "warning");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/plants/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(enteredPlantData),
      });

      if (!response.ok) {
        throw new Error("Failed to create plant");
      }

      const savedPlant = await response.json();
      setPlants((prev) => [savedPlant, ...prev]);

      showNotification("Plant added successfully", "success");
    } catch (err) {
      console.error("Add Plant Error:", err);
      setError("Unable to add plant. Please try again later.");
      showNotification("Failed to add plant", "error");
    }
  }

  // Update Plant - Admin Only
  async function updatePlantById(id, updatedData) {
    if (!isAdminLoggedIn) {
      showNotification("Unauthorized: Admin access required", "warning");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update plant");
      }

      const updatedPlant = await response.json();

      setPlants((prev) =>
        prev.map((plant) =>
          plant._id === id ? { ...plant, ...updatedPlant } : plant
        )
      );

      showNotification("Plant updated successfully", "success");
    } catch (err) {
      console.error("Update Plant Error:", err);
      setError("Unable to update plant. Please try again later.");
      showNotification("Failed to update plant", "error");
    }
  }

  // Delete Plant - Admin Only
  async function deletePlantById(id) {
    if (!isAdminLoggedIn) {
      showNotification("Unauthorized: Admin access required", "warning");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/plants/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }

      setPlants((prev) => prev.filter((plant) => plant._id !== id));

      showNotification("Plant deleted successfully", "success");
    } catch (err) {
      console.error("Delete Plant Error:", err);
      setError("Unable to delete plant. Please try again later.");
      showNotification("Failed to delete plant", "error");
    }
  }

  return (
    <PlantContext.Provider
      value={{
        plants,
        totalPages,
        fetchPlants,
        getPlantById,
        addPlant,
        updatePlantById,
        deletePlantById,
        fetchAllPlants,
      }}
    >
      {children}

      {error && (
        <p className="text-red-700 bg-red-200 p-4 mt-4 rounded-md border border-red-400">
          {error}
        </p>
      )}
    </PlantContext.Provider>
  );
}
