
import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminProvider } from "@/contexts/AdminContext";
import { Toaster } from "sonner";

function App() {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16"> 
            <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </AdminProvider>
  );
}

export default App;