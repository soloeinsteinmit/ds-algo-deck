import { Button } from "@nextui-org/react";
import Logo from "./components/Logo";

function App() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen w-full">
      <Logo />
      <Button color="primary">Get Started</Button>
    </div>
  );
}

export default App;
