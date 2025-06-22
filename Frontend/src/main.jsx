import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// MUI theme
const theme = createTheme({
  palette: {
    mode: "light",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);
