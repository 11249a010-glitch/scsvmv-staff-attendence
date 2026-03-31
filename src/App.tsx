import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [staff, setStaff] = useState<{ employee_code: string; employee_name: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("staff_session");
    if (saved) {
      try { setStaff(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const handleLogin = (s: { employee_code: string; employee_name: string }) => setStaff(s);

  const handleLogout = () => {
    localStorage.removeItem("staff_session");
    setStaff(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                staff ? <Index staffName={staff.employee_name} onLogout={handleLogout} /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/login"
              element={
                staff ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
