import { createContext, useContext, useEffect, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { AdminAuthContext } from "../context/ADMIN/AdminAuthContext";

export const PlantContext = createContext({
  plants: [],
  totalPlants: 0,
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
  const { isAdminAuthenticated, adminToken } = useContext(AdminAuthContext);

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
      setPlants(data?.data?.plants || []);
    } catch (err) {
      console.error("Error fetching all plants:", err);
      showNotification("Failed to load all plants", "error");
    }
  }

  // Add Plant - Admin Only
  async function addPlant(plantData) {
    if (!isAdminAuthenticated || !adminToken) {
      showNotification("Unauthorized: Admin access required", "warning");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/plants/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: plantData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add plant");
      }

      await fetchAllPlants();
      showNotification("Plant added successfully", "success");
      return result;
    } catch (err) {
      console.error("Add Plant Error:", err);
      showNotification(err.message || "Failed to add plant", "error");
      throw err;
    }
  }

  // Update Plant - Admin Only
  async function updatePlantById(id, updatedData) {
    if (!isAdminAuthenticated || !adminToken) {
      showNotification("Unauthorized: Admin access required", "warning");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/plants/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: updatedData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update plant");
      }

      await fetchAllPlants();
      showNotification("Plant updated successfully", "success");
      return result;
    } catch (err) {
      console.error("Update Plant Error:", err);
      showNotification(err.message || "Failed to update plant", "error");
      throw err;
    }
  }

  // Delete Plant - Admin Only
  async function deletePlantById(id) {
    if (!isAdminAuthenticated || !adminToken) {
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

      // Handle all OK statuses (including 204)
      if (response.ok) {
        await fetchAllPlants();
        showNotification("Plant deleted successfully", "success");
        return;
      }

      // If not OK, try to extract and show error
      let errorMsg = "Failed to delete plant";
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } catch {
        // JSON parse failed, keep default message
      }

      throw new Error(errorMsg);
    } catch (err) {
      console.error("Delete Plant Error:", err.message);
      setError("Unable to delete plant. Please try again later.");
      showNotification("Failed to delete plant", "error");
    }
  }

  return (
    <PlantContext.Provider
      value={{
        plants,
        totalPlants,
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
        <p className="text-red-700 bg-red-200 p-4 m-4 rounded-md border border-red-400 text-center">
          {error}
        </p>
      )}
    </PlantContext.Provider>
  );
}
