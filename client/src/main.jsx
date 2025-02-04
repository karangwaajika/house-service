// style files
import "./assets/app.css";
import "./assets/index.css";
import "./assets/dashboard.css";

// react 
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// page component
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
