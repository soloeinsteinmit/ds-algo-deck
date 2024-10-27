import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainOutletLayout";
import Explore from "./pages/Explore/Explore";
import Playground from "./pages/Playground/Playground";
import Algorithms from "./pages/Algorithms/Algorithms";
import PlaygroundLayout from "./layouts/PlaygroundLayout";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import PageNotFound from "./pages/NotFound/PageNotFound";
import MainOuletLayout from "./layouts/MainOutletLayout";
import PlaygroundDashboardLayout from "./layouts/PlaygroundDashboardLayout";
import PlaygroundDashboard from "./pages/Playground/PlaygroundDashboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainOuletLayout />}>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Explore />} />
          <Route path="algorithms" element={<Algorithms />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/playground" element={<PlaygroundDashboardLayout />}>
          <Route index element={<PlaygroundDashboard />} />
          {/* <Route index element={<Playground />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <RouterProvider router={router} />
      </NextThemesProvider>
    </>
  );
}

export default App;
