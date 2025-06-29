import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

import LoadingSpinner from "../../../ui/LoadingSpinner";
import { AdminUsersContext } from "../../../context/ADMIN/AdminUsersContext";

import UsersTable from "./UsersTable";

const UsersPage = () => {
  const { users, fetchAllUsers } = useContext(AdminUsersContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchAllUsers();
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Box my="1.5rem">
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            width="100%"
          >
            <LoadingSpinner />
          </Box>
        ) : users?.length === 0 ? (
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
