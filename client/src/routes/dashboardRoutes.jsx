import PlaygroundDashboardLayout from "../layouts/PlaygroundDashboardLayout";
import PlaygroundDashboard from "../pages/Playground/PlaygroundDashboard";
import PlaygroundLayout from "../layouts/PlaygroundLayout";

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
