import { RouterProvider } from "react-router-dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { router } from "./utils/BrowserRoutes";

function App() {
  return (
    <>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <RouterProvider router={router} />
      </NextThemesProvider>
    </>
  );
}

export default App;
