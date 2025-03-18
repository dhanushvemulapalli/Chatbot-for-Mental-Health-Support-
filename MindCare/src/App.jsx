import { useTheme } from "next-themes";
import Login from "./components/Login/Login";

function App() {
  const { setTheme } = useTheme();
  setTheme("light");
  return (
    <>
      <Login />
    </>
  );
}

export default App;
