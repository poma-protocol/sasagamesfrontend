import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
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
import { CreateActivityPage } from "@/pages/CreateActivityPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import App from './App';
import NotFound from "@/pages/NotFound";
const router = createBrowserRouter([
    {
         path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/battles", element: <BattlesPage /> },
            { path: "/battles/:id", element: <BattleDetailPage /> },
            { path: "/how-it-works", element: <HowItWorksPage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/admin-login", element: <AdminLoginPage /> },

            // Protected Admin Routes
            {
                path: "/admin/manage-games",
                element: (
                    <ProtectedRoute>
                        <ManageGamesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin/create-game",
                element: (
                    <ProtectedRoute>
                        <CreateGamePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin/manage-activities",
                element: (
                    <ProtectedRoute>
                        <ManageActivitiesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin/register-game",
                element: (
                    <ProtectedRoute>
                        <RegisterGamePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin/create-activity",
                element: (
                    <ProtectedRoute>
                        <CreateActivityPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/my-battles",
                element: (
                    <ProtectedRoute>
                        <MyBattlesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/create-battle",
                element: (
                    <ProtectedRoute>
                        <CreateBattlePage />
                    </ProtectedRoute>
                ),
            },

            // { path: "*", element: <NotFound /> },
        ]
    },
])

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
