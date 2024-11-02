import { createBrowserRouter } from "react-router-dom";
import { routeConfig } from "../routes/routeConfig.jsx";

export const router = createBrowserRouter([routeConfig]);

/* 


import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { routeConfig } from "../routes/routeConfig.jsx";
import Loader from "../components/playground/Loader";

// Wrap lazy-loaded components with Suspense
const wrapWithSuspense = (routes) => {
  const wrapElement = (route) => ({
    ...route,
    element: <Suspense fallback={<Loader />}>{route.element}</Suspense>,
    ...(route.children && { children: route.children.map(wrapElement) }),
  });

  return wrapElement(routes);
};

export const router = createBrowserRouter([wrapWithSuspense(routeConfig)]);
*/
