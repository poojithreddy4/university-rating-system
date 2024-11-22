import { CssBaseline, Typography } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./app-provider";
import ProtectedRoutes from "./components/protected-routes";
import Home from "./pages/home";
import Insights from "./pages/insights";
import Login from "./pages/login";
import Register from "./pages/Register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppProvider />,
      children: [
        {
          path: "/",
          element: <ProtectedRoutes />,
          children: [],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/insights/:univId",
          element: <Insights />,
        },
        {
          path: "*",
          element: <Typography variant="h1">Page not found!!</Typography>,
        },
      ],
    },
  ]);

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
