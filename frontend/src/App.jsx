import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home";
import History from "./pages/History";
import AnalysisDetails from "./pages/AnalysisDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { isLoading } = useAuth0();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#2A2A2A] border-t-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/app" element={<ProtectedRoute><Home darkMode={darkMode} setDarkMode={setDarkMode} /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History darkMode={darkMode} setDarkMode={setDarkMode} /></ProtectedRoute>} />
        <Route path="/analysis/:id" element={<ProtectedRoute><AnalysisDetails darkMode={darkMode} setDarkMode={setDarkMode} /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;