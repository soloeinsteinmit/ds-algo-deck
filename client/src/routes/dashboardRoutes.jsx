import PlaygroundDashboardLayout from "../layouts/PlaygroundDashboardLayout.jsx";
import PlaygroundDashboard from "../pages/Playground/PlaygroundDashboard.jsx";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout.jsx";

export const dashboardRoutes = {
  path: "dashboard",
  element: <PlaygroundDashboardLayout />,
  children: [
    {
      index: true,
      element: <PlaygroundDashboard />,
    },
    {
      path: "playground",
      element: <PlaygroundLayout />,
    },
  ],
};
