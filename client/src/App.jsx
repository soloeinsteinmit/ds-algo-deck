import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import Explore from "./pages/Explore/Explore";
import Playground from "./pages/Playground/Playground";
import Algorithms from "./pages/Algorithms/Algorithms";
import PlaygroundLayout from "./layouts/PlaygroundLayout";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Explore />} />
          <Route path="algorithms" element={<Algorithms />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/playground" element={<PlaygroundLayout />}>
          <Route index element={<Playground />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
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
