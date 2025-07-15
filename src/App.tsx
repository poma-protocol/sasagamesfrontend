import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LandingPage } from "./pages/LandingPage";
import { BattlesPage } from "./pages/BattlesPage";
import { MyBattlesPage } from "./pages/MyBattlesPage";
import { BattleDetailPage } from "./pages/BattleDetailPage";
import { CreateBattlePage } from "./pages/CreateBattlePage";
import { ManageGamesPage } from "./pages/ManageGamesPage";
import { RegisterGamePage } from "./pages/RegisterGamePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/battles" element={<BattlesPage />} />
              <Route path="/battles/:id" element={<BattleDetailPage />} />
              <Route path="/my-battles" element={<MyBattlesPage />} />
              <Route path="/create-battle" element={<CreateBattlePage />} />
              <Route path="/manage-games" element={<ManageGamesPage />} />
              <Route path="/register-game" element={<RegisterGamePage />} />
              <Route path="/quests" element={<BattlesPage />} />
              <Route path="/how-it-works" element={<LandingPage />} />
              <Route path="/about" element={<LandingPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
