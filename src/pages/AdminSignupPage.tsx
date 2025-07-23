
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const VITE_BACKEND = import.meta.env.VITE_BACKEND_URL;

export function AdminSignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const adminStatus = localStorage.getItem("isAdminLoggedIn");
        if (adminStatus === "true") {
            navigate("/admin/register-game");
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await axios.post(`${VITE_BACKEND}/auth/register`, {
            email,
            password
        });

        if (res.status === 201) {
            localStorage.setItem("isAdminLoggedIn", "true");
            const token = res.data.token;
            localStorage.setItem("accessToken", token);
            toast({
                title: "Signup Successful",
                description: "Welcome, admin!",
            });
            navigate("/game-admin/register-game");
        } else {
            toast({
                title: "Signup Failed",
                description: "Invalid email or password",
                variant: "destructive",
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <Card className="w-full max-w-md border-primary/20 bg-card">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-end flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Game admin signup page</CardTitle>
                    <CardDescription>
                        Access the admin dashboard to manage games and battles
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@sasagames.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/admin/login" className="text-primary hover:underline">
                                Login here
                            </Link>
                        </p>

                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
