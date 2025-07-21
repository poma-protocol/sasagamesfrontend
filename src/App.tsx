
import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminProvider } from "@/contexts/AdminContext";
import { Toaster } from "sonner";
import {
    darkTheme,
    RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: true,
        },
    
    },
});
function App() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider coolMode theme={darkTheme({
                    accentColor: '#7b3fe4',
                    accentColorForeground: 'white',
                    borderRadius: 'large',
                    fontStack: 'system',
                    overlayBlur: 'small',
                })}>
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
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;