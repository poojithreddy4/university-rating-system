import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./app-provider";
import Home from "./pages/home";
import Login from "./pages/login";

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
          path: "/",
          element: <Home />,
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
