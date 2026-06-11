// src/App.jsx
import React from "react";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
