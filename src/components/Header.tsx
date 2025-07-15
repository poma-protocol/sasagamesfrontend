
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Zap, Settings, Plus, GamepadIcon, LogOut } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdminLoggedIn, logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Battles", path: "/battles" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
  ];

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  const handleAdminLogout = () => {
    logout();
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
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-rajdhani font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Admin Area & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Dropdown - Show when admin is logged in */}
            {isAdminLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-rajdhani font-semibold">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/manage-games" className="flex items-center">
                      <GamepadIcon className="h-4 w-4 mr-2" />
                      Manage Games
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register-game" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Register Game
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-battles" className="flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      My Battles
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleAdminLogout} className="flex items-center text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Admin Login Button - Show when not logged in */}
            {!isAdminLoggedIn && (
              <Button
                onClick={handleAdminLogin}
                variant="default"
                className="font-rajdhani font-semibold btn-gradient"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Login
              </Button>
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-rajdhani font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Admin Actions */}
              {isAdminLoggedIn ? (
                <div className="space-y-2 pt-4 border-t border-border">
                  <Link
                    to="/manage-games"
                    className="block font-rajdhani font-medium text-foreground hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Games
                  </Link>
                  <Link
                    to="/register-game"
                    className="block font-rajdhani font-medium text-foreground hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register Game
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
                </div>
              ) : (
                <Button
                  onClick={() => {
                    handleAdminLogin();
                    setIsMenuOpen(false);
                  }}
                  variant="default"
                  className="w-full font-rajdhani font-semibold btn-gradient"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
