import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainOuletLayout from "../layouts/MainOutletLayout";
import PublicLayout from "../layouts/PublicLayout";
import Explore from "../pages/Explore/Explore";
import Algorithms from "../pages/Algorithms/Algorithms";
import PlaygroundDashboardLayout from "../layouts/PlaygroundDashboardLayout";
import PlaygroundDashboard from "../pages/Playground/PlaygroundDashboard";
import PlaygroundLayout from "../layouts/PlaygroundLayout";
import PageNotFound from "../pages/NotFound/PageNotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainOuletLayout />}>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Explore />} />
        <Route path="algorithms" element={<Algorithms />} />
      </Route>

      {/* Dashboard routes */}
      <Route path="dashboard" element={<PlaygroundDashboardLayout />}>
        <Route index element={<PlaygroundDashboard />} />
        <Route path="playground" element={<PlaygroundLayout />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
