import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import "./fonts.css";
import { AlertProvider } from "./components/AlertProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Provider>
  </StrictMode>
);
