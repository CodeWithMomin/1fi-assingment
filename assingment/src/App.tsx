import { useState } from "react";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ShopPage } from "./pages/ShopPage";
import type { Screen } from "./types";

function App() {
  const [screen, setScreen] = useState<Screen>("home");

  switch (screen) {
    case "login":
      return (
        <LoginPage
          onBack={() => setScreen("home")}
          onSuccess={() => setScreen("shop")}
        />
      );
    case "shop":
      return <ShopPage onHome={() => setScreen("home")} />;
    default:
      return (
        <HomePage onShop={() => setScreen("login")} onNavigate={setScreen} />
      );
  }
}

export default App;
