// style files
import "./assets/app.css";
import "./assets/index.css";
import "./assets/dashboard.css";
import "./assets/login.css";
import "./assets/animation.css";
import "./assets/category.css";
import "./assets/service.css";

// react
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// page component
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectDashboard from "./utils/ProtectDashboard";
import GoogleRedirectHandler from "./utils/GoogleRedirectHandler";
import DashboardHome from "./pages/DashboardHome";
import AddCategoy from "./pages/AddCategoy";
import ViewCategory from "./pages/ViewCategory";
import AddService from "./pages/AddService";
import ViewService from "./pages/ViewService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login/callback/",
    element: <GoogleRedirectHandler />,
    errorElement: <NotFoundPage />,
  },

  {
    element: <ProtectDashboard />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/home",
            element: <DashboardHome />,
          },
          {
            path: "/dashboard/add-category",
            element: <AddCategoy />,
          },
          {
            path: "/dashboard/view-category",
            element: <ViewCategory />,
          },
          {
            path: "/dashboard/add-service",
            element: <AddService />,
          },
          {
            path: "/dashboard/view-service",
            element: <ViewService />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
