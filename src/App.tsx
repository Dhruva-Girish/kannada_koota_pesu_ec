import { useEffect } from "react";
import { StatsigProvider, useStatsigClient } from "@statsig/react-bindings";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "@/pages/Blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Upis from "./pages/Upis";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Create a query client instance
const queryClient = new QueryClient();

// Logging component for Statsig events
function StatsigLogger() {
  const { client } = useStatsigClient();

  useEffect(() => {
    // Log when the app loads
    client.logEvent("app_loaded");
  }, [client]);

  return null; // no UI, just runs logic
}

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/team" element={<Team />} />
              {/* <Route path="/upis" element={<Upis />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  // Wrap entire app with StatsigProvider
  <StatsigProvider sdkKey="client-xxxxxx" user={{ userID: "SharathGowda" }}>
    <StatsigLogger /> {/* Logs event when app starts */}
    <AppContent />
  </StatsigProvider>
);

export default App;
