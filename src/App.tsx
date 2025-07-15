import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminProvider } from "@/contexts/AdminContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import { BattlesPage } from "./pages/BattlesPage";
import { MyBattlesPage } from "./pages/MyBattlesPage";
import { BattleDetailPage } from "./pages/BattleDetailPage";
import { CreateBattlePage } from "./pages/CreateBattlePage";
import { ManageGamesPage } from "./pages/ManageGamesPage";
import { RegisterGamePage } from "./pages/RegisterGamePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { AboutPage } from "./pages/AboutPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/battles" element={<BattlesPage />} />
                <Route path="/battles/:id" element={<BattleDetailPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/admin-login" element={<AdminLoginPage />} />
                
                {/* Protected Admin Routes */}
                <Route path="/my-battles" element={
                  <ProtectedRoute>
                    <MyBattlesPage />
                  </ProtectedRoute>
                } />
                <Route path="/create-battle" element={
                  <ProtectedRoute>
                    <CreateBattlePage />
                  </ProtectedRoute>
                } />
                <Route path="/manage-games" element={
                  <ProtectedRoute>
                    <ManageGamesPage />
                  </ProtectedRoute>
                } />
                <Route path="/register-game" element={
                  <ProtectedRoute>
                    <RegisterGamePage />
                  </ProtectedRoute>
                } />
                <Route path="/create-game" element={
                  <ProtectedRoute>
                    <CreateGamePage />
                  </ProtectedRoute>
                } />
                <Route path="/manage-activities" element={
                  <ProtectedRoute>
                    <ManageActivitiesPage />
                  </ProtectedRoute>
                } />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AdminProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
