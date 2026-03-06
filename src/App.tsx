import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Technologies from "./pages/Technologies";
import ProductDetail from "./pages/ProductDetail";
import RepairCenter from "./pages/RepairCenter";
import ITSolutions from "./pages/ITSolutions";
import ITAcademy from "./pages/ITAcademy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.slice(1);

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const frame = requestAnimationFrame(scrollToTarget);
    const timeout = window.setTimeout(scrollToTarget, 100);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [location.hash, location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/technologies/:id" element={<ProductDetail />} />
          <Route path="/repair-center" element={<RepairCenter />} />
          <Route path="/it-solutions" element={<ITSolutions />} />
          <Route path="/it-academy" element={<ITAcademy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
