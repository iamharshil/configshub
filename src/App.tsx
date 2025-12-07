import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import { DashboardOverview } from "./components/views/DashboardOverview";
import { ConfigsView } from "./components/views/ConfigView";
import { PromptsView } from "./components/views/PromptsView";
import { CliView } from "./components/views/CliView";
import { SnippetsView } from "./components/views/SnippetsView";
import { SettingsView } from "./components/views/SettingsView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { LandingPage } from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { GlobalLoader } from "./components/GlobalLoader";
import { LandingLoader } from "./components/LandingLoader";
import { AuthLoader } from "./components/AuthLoader";
import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient();

const App = () => {
  useTheme(); // Initialize theme globally
  const [isLoading, setIsLoading] = useState(true);
  const [loaderType, setLoaderType] = useState<'landing' | 'auth' | 'dashboard'>('landing');

  useEffect(() => {
    // Determine loader type based on initial path
    const path = window.location.pathname;
    if (path === '/') {
      setLoaderType('landing');
    } else if (['/login', '/signup', '/forgot-password'].includes(path)) {
      setLoaderType('auth');
    } else {
      setLoaderType('dashboard');
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    if (loaderType === 'landing') {
      return <LandingLoader />;
    } else if (loaderType === 'auth') {
      return <AuthLoader />;
    } else {
      return <GlobalLoader />;
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
