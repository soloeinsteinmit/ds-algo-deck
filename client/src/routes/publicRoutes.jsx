import Explore from "../pages/Explore/Explore";
import Algorithms from "../pages/Algorithms/Algorithms";
import PublicLayout from "../layouts/PublicLayout";

export const publicRoutes = {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <Explore />,
      meta: {
        title: "Explore",
        description: "Explore the world of algorithms and data structures",
        keywords: "algorithms, data structures, explore, learn, code",
        breadcrumb: "Explore",
      },
    },
    {
      path: "algorithms",
      element: <Algorithms />,
      meta: {
        title: "Algorithms",
        description: "Learn about algorithms and their implementations",
        keywords: "algorithms, implementations, learn, code",
        breadcrumb: "Algorithms",
      },
    },
  ],
};
