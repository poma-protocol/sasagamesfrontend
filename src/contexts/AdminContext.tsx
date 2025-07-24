
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AdminContextType {
    isAdminLoggedIn: boolean;
    login: (token: string) => void;
    logout: (token: string) => void;
}
interface JwtPayload {
    email: string;
    iat: number;
    exp: number;
    userId: number;
}
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken: JwtPayload = jwtDecode(token);
                console.log("Decoded token", decodedToken);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp < currentTime) {
                    console.warn("Token has expired");
                    setIsAdminLoggedIn(false);
                    return;
                }
                setIsAdminLoggedIn(true);
            } catch (error) {
                console.error("Error decoding token", error);
                setIsAdminLoggedIn(false);
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("accessToken", token);
        setIsAdminLoggedIn(true);
    };

    const logout = (token: string) => {
        localStorage.removeItem("accessToken");
        setIsAdminLoggedIn(false);
    };

    return (
        <AdminContext.Provider value={{ isAdminLoggedIn, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}
