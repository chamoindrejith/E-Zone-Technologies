import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Technologies from "./pages/Technologies";
import RepairCenter from "./pages/RepairCenter";
import ITSolutions from "./pages/ITSolutions";
import ITAcademy from "./pages/ITAcademy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/technologies" element={<Technologies />} />
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
