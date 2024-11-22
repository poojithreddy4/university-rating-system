import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./app-provider";
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
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/insights/:univId",
          element: <Insights />,
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
