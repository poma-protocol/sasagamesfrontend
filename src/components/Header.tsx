import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Zap, Settings, Plus, GamepadIcon, LogOut } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import path from "path";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAdminLoggedIn, logout } = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const isActive = (path: string) => location.pathname === path;

    const userNavItems = [
        { name: "My Battles", path: "/my-battles" },
        { name: "All Battles", path: "/battles" },
        // { name: "How it Works", path: "/how-it-works" },
        // { name: "About Us", path: "/about" },
    ];

    const adminNavItems = [
        { name: "Manage Games", path: "/game-admin/manage-games" },
        { name: "Register Game", path: "/game-admin/register-game" },
        { name: "Create Activity", path: "/game-admin/create-activity" },
    ];

    const handleAdminLogin = () => {
        navigate("/game-admin/login");
    };

    const handleAdminLogout = () => {
        if (!token) return;
        logout(token);
        navigate("/");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 font-orbitron font-bold">
                        <Zap className="h-8 w-8 text-accent" />
                        <span className="text-xl text-gradient">SASAGAMES</span>
                    </Link>

                    {/* Desktop Navigation */}
                    {/* <nav className="hidden md:flex items-center space-x-8">
                        {isAdminLoggedIn ? (
                            adminNavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`font-rajdhani font-medium transition-colors duration-200 ${isActive(item.path)
                                        ? "text-accent"
                                        : "text-foreground hover:text-accent"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))
                        ) : (
                            userNavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`font-rajdhani font-medium transition-colors duration-200 ${isActive(item.path)
                                        ? "text-accent"
                                        : "text-foreground hover:text-accent"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))
                        )}
                    </nav> */}


                    <ConnectButton />

                    {/* Admin Area & Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isAdminLoggedIn && (<Button className="font-rajdhani font-semibold" onClick={handleAdminLogin}>
                            <Link to="/game-admin/login" className="flex items-center">
                                <Settings className="h-4 w-4 mr-2" />
                                Game Admin Login
                            </Link>
                        </Button>)}
                        {isAdminLoggedIn ? (
                            <>
                                {/* Admin Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="font-rajdhani font-semibold">
                                            <Settings className="h-4 w-4 mr-2" />
                                            Admin
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        {adminNavItems.map((item) => (
                                            <DropdownMenuItem key={item.name} asChild>
                                                <Link to={item.path} className="flex items-center">
                                                    {item.name === "Manage Games" && <GamepadIcon className="h-4 w-4 mr-2" />}
                                                    {item.name === "Register Game" && <Plus className="h-4 w-4 mr-2" />}
                                                    {item.name === "Create Activity" && <Plus className="h-4 w-4 mr-2" />}
                                                    {item.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link to="/my-battles" className="flex items-center">
                                                <Zap className="h-4 w-4 mr-2" />
                                                My Battles
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleAdminLogout}
                                            className="flex items-center text-red-600"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                {/* Normal user Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="font-rajdhani font-semibold">
                                            <Settings className="h-4 w-4 mr-2" />
                                            Profile
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        {userNavItems.map((item) => (
                                            <DropdownMenuItem key={item.name} asChild>
                                                <Link to={item.path} className="flex items-center">
                                                    {/* {item.name === "Battles" && <GamepadIcon className="h-4 w-4 mr-2" />}
                                                    {item.name === "Register Game" && <Plus className="h-4 w-4 mr-2" />}
                                                    {item.name === "Create Activity" && <Plus className="h-4 w-4 mr-2" />} */}
                                                    {item.name === "My Battles" && <GamepadIcon className="h-4 w-4 mr-4" />}
                                                    {item.name === "All Battles" && <GamepadIcon className="h-4 w-4 mr-4" />}
                                                    {item.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                        {/* <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link to="/my-battles" className="flex items-center">
                                                <Zap className="h-4 w-4 mr-2" />
                                                My Battles
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator /> */}

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <nav className="flex flex-col space-y-4">
                            {isAdminLoggedIn ? (
                                <>
                                    {adminNavItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={`font-rajdhani font-medium transition-colors duration-200 ${isActive(item.path)
                                                ? "text-accent"
                                                : "text-foreground hover:text-accent"
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Link
                                        to="/my-battles"
                                        className="font-rajdhani font-medium text-foreground hover:text-accent"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Battles
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleAdminLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left font-rajdhani font-medium text-red-600 hover:text-red-500"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    {userNavItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={`font-rajdhani font-medium transition-colors duration-200 ${isActive(item.path)
                                                ? "text-accent"
                                                : "text-foreground hover:text-accent"
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Button
                                        onClick={() => {
                                            handleAdminLogin();
                                            setIsMenuOpen(false);
                                        }}
                                        variant="default"
                                        className="w-full font-rajdhani font-semibold btn-gradient"
                                    >
                                        <Settings className="h-4 w-4 mr-2" />
                                        Game Admin Login
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}