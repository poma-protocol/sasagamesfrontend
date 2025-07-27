
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings, Eye, Search, Filter, Users, Zap, Gamepad2 } from "lucide-react";
import { FilteredGames, filteredGamesSchema, gameChallengesSchema, GamesChallenges } from "@/types";
import { toast } from "sonner";
import axios from "axios";

const VITE_BACKEND = import.meta.env.VITE_BACKEND_URL;
const ACTIVITY_IMAGE_URL = import.meta.env.VITE_ACTIVITY_IMAGE_URL;

export function ManageGamesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [games, setGames] = useState<FilteredGames[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const getInitialGames = async () => {
            try {
                setLoading(true);
                if (!token) {
                    toast.error("You must be logged in to manage games");
                    return;
                }
                const data = await axios.get(`${VITE_BACKEND}/game/filter`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const parsedGames: FilteredGames[] = [];
                for (const d of data.data) {
                    const parsed = filteredGamesSchema.safeParse(d);
                    if (parsed.success) {
                        parsedGames.push(parsed.data);
                    }
                }

                const categoriesFromBackend = [...new Set(parsedGames.map((g) => g.category))]

                setLoading(false);
                setGames(parsedGames);
                setCategories(categoriesFromBackend);
            } catch (err) {
                setLoading(false);
                console.error("Error getting initial games", err);
                toast.error("Could not get games");
            }
        }

        getInitialGames();
    }, []);

    async function filterGames() {
        try {
            setLoading(true);
            if (!token) {
                    toast.error("You must be logged in to manage games");
                    return;
                }
            const data = await axios.get(`${VITE_BACKEND}/game/filter`, {
                params: {
                    search: searchTerm,
                    category: selectedCategory
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            const parsedGames: FilteredGames[] = [];
            for (const d of data.data) {
                const parsed = filteredGamesSchema.safeParse(d);
                if (parsed.success) {
                    parsedGames.push(parsed.data);
                }
            }

            setLoading(false);
            setGames(parsedGames);
        } catch (err) {
            setLoading(false);
            console.error("Error filtering games", err);
            toast.error("Could not filter games");
        }
    }

    const totalStats = {
        totalGames: games.length,
        totalPlayers: games.reduce((sum, game) => sum + game.totalPlayers, 0),
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                            <Gamepad2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                MANAGE GAMES
                            </h1>
                            <p className="text-muted-foreground mt-2 font-rajdhani">
                                Oversee your game portfolio and performance metrics
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <Link to="/game-admin/manage-activities">
                            <Button variant="outline" className="font-rajdhani font-semibold">
                                <Settings className="h-4 w-4 mr-2" />
                                MANAGE ACTIVITIES
                            </Button>
                        </Link>
                        <Link to="/game-admin/register-game">
                            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-rajdhani font-semibold">
                                <Plus className="h-4 w-4 mr-2" />
                                CREATE GAME
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground font-rajdhani">Total Games</p>
                                    <p className="text-3xl font-bold font-orbitron text-primary">{totalStats.totalGames}</p>
                                </div>
                                <Gamepad2 className="h-8 w-8 text-primary/60" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground font-rajdhani">Total Players</p>
                                    <p className="text-3xl font-bold font-orbitron text-accent">{totalStats.totalPlayers.toLocaleString()}</p>
                                </div>
                                <Users className="h-8 w-8 text-accent/60" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg font-rajdhani flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-rajdhani font-medium">Search Games</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by game name..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                            filterGames();
                                        }}
                                        className="pl-10 bg-background/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-rajdhani font-medium">Category</label>
                                <Select value={selectedCategory} onValueChange={(category) => {
                                    setSelectedCategory(category);
                                    filterGames();
                                }}>
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((c) => (
                                            <SelectItem value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6">
                    {loading === false ? games.map((game) => (
                        <Card key={game.id} className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${ACTIVITY_IMAGE_URL}/${game.image}`}
                                            alt={game.name}
                                            className="w-24 h-24 rounded-lg object-cover border border-primary/20"
                                        />
                                        <div>
                                            <CardTitle className="text-xl font-orbitron flex items-center gap-2">
                                                {game.name}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-2">
                                                <Badge variant="secondary" className="font-rajdhani">{game.category}</Badge>
                                            </CardDescription>
                                            <p className="text-sm text-muted-foreground mt-1 font-rajdhani">
                                                Created: {new Date(game.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/game-admin/details/${game.id}`)}
                                            className="font-rajdhani"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-primary font-orbitron">{game.challenges}</p>
                                        <p className="text-sm text-muted-foreground font-rajdhani">Challenges</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-accent font-orbitron">{game.activeBattles}</p>
                                        <p className="text-sm text-muted-foreground font-rajdhani">Active Battles</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-yellow-400 font-orbitron">{game.totalPlayers}</p>
                                        <p className="text-sm text-muted-foreground font-rajdhani">Players</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )) : <div className="text-center my-6">
                        Getting games...
                    </div>}
                </div>
            </div>
        </div>
    );
}
