
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminProvider } from "@/contexts/AdminContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

// Import all pages
import { LandingPage } from "@/pages/LandingPage";
import { BattlesPage } from "@/pages/BattlesPage";
import { BattleDetailPage } from "@/pages/BattleDetailPage";
import { HowItWorksPage } from "@/pages/HowItWorksPage";
import { AboutPage } from "@/pages/AboutPage";
import { AdminLoginPage } from "@/pages/AdminLoginPage";
import { CreateGamePage } from "@/pages/CreateGamePage";
import { ManageActivitiesPage } from "@/pages/ManageActivitiesPage";
import { ManageGamesPage } from "@/pages/ManageGamesPage";
import { MyBattlesPage } from "@/pages/MyBattlesPage";
import { CreateBattlePage } from "@/pages/CreateBattlePage";
import { RegisterGamePage } from "@/pages/RegisterGamePage";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/battles" element={<BattlesPage />} />
            <Route path="/battles/:id" element={<BattleDetailPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin/manage-games" 
              element={
                <ProtectedRoute>
                  <ManageGamesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/create-game" 
              element={
                <ProtectedRoute>
                  <CreateGamePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/manage-activities" 
              element={
                <ProtectedRoute>
                  <ManageActivitiesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/register-game" 
              element={
                <ProtectedRoute>
                  <RegisterGamePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-battles" 
              element={
                <ProtectedRoute>
                  <MyBattlesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-battle" 
              element={
                <ProtectedRoute>
                  <CreateBattlePage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
