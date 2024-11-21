import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

const AppProvider = () => {
  return (
    <Box>
      <Navbar />

      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppProvider;
