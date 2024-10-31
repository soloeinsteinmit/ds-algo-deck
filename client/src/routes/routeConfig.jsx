import React from "react";
import { lazy } from "react";
import MainOutletLayout from "../layouts/MainOutletLayout";
import { publicRoutes } from "./publicRoutes.jsx";
import { dashboardRoutes } from "./dashboardRoutes.jsx";

// Lazy load the 404 page
const PageNotFound = lazy(() => import("../pages/NotFound/PageNotFound"));

export const routeConfig = {
  element: <MainOutletLayout />,
  children: [
    publicRoutes,
    dashboardRoutes,
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};
