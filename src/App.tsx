import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import { ConfigsView } from "./components/views/ConfigView";
import { PromptsView } from "./components/views/PromptsView";
import { SettingsView } from "./components/views/SettingsView";
import { DashboardOverview } from "./components/views/DashboardOverview";
import { CliView } from "./components/views/CliView";
import { SnippetsView } from "./components/views/SnippetsView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { useState, useEffect } from "react";
import { GlobalLoader } from "@/components/GlobalLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial resource loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardOverview />} />
              <Route path="configs" element={<ConfigsView />} />
              <Route path="prompts" element={<PromptsView />} />
              <Route path="cli" element={<CliView />} />
              <Route path="snippets" element={<SnippetsView />} />
              <Route path="settings" element={<SettingsView />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider >
  );
};

export default App;
