import AnalysisDetails from "./pages/AnalysisDetails";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Home from "./pages/Home";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  return (

    <div className="min-h-screen">

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Routes>

  <Route
  path="/"
  element={
    <Home
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  }
/>

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
  path="/signup"
  element={<Signup />}
  />

  <Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>

  <Route
  path="/analysis/:id"
  element={
    <ProtectedRoute>
      <AnalysisDetails />
    </ProtectedRoute>
  }
/>

</Routes>

    </div>

  );
}

export default App;