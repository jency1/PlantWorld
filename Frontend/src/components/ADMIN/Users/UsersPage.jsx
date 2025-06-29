import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

import UsersTable from "./UsersTable";

import { NotificationContext } from "../../../context/NotificationContext";
import { AdminAuthContext } from "../../../context/ADMIN/AdminAuthContext";

const UsersPage = () => {
  const { showNotification } = useContext(NotificationContext);
  const { isAdminAuthenticated } = useContext(AdminAuthContext);

  const [users, setUsers] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch users data
  useEffect(() => {
    async function fetchAllUsers() {
      if (!isAdminAuthenticated) {
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        // console.log("All Users Data: ", data);

        if (!response.ok) {
          showNotification("Error fetching users data.", "error");
          throw new Error("Error fetching users data.");
        }

        setUsers(data?.data?.users);
      } catch (err) {
        showNotification("Failed to fetch users data.", "error");
        throw new Error(err.message || "Failed to fetch users data.");
      }
    }

    fetchAllUsers();
  }, [BASE_URL]);

  return (
    <Container>
      <Box
        sx={{
          my: "1.5rem",
        }}
      >
        {users?.length === 0 ? (
          <Typography variant="h6" color="error">
            No users data found.
          </Typography>
        ) : (
          <UsersTable users={[...users].reverse()} />
        )}
      </Box>
    </Container>
  );
};

export default UsersPage;
