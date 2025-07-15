
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings, Eye, Edit, Trash2, Search, Filter, Users, Zap, Trophy, TrendingUp, Gamepad2 } from "lucide-react";

export function ManageGamesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [games] = useState([
    {
      id: 1,
      name: "Zombie Apocalypse",
      category: "Action",
      image: "/api/placeholder/300/200",
      challenges: 3,
      activeBattles: 2,
      totalPlayers: 1250,
      revenue: 15420,
      rating: 4.8,
      status: "active",
      featured: true,
      createdAt: "2024-01-15",
      lastUpdate: "2024-02-10"
    },
    {
      id: 2,
      name: "Racing Championship",
      category: "Racing",
      image: "/api/placeholder/300/200",
      challenges: 5,
      activeBattles: 1,
      totalPlayers: 890,
      revenue: 8930,
      rating: 4.6,
      status: "active",
      featured: false,
      createdAt: "2024-01-20",
      lastUpdate: "2024-02-08"
    },
    {
      id: 3,
      name: "Treasure Hunt",
      category: "Adventure",
      image: "/api/placeholder/300/200",
      challenges: 2,
      activeBattles: 0,
      totalPlayers: 450,
      revenue: 2340,
      rating: 4.2,
      status: "inactive",
      featured: false,
      createdAt: "2024-01-10",
      lastUpdate: "2024-01-25"
    }
  ]);

  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const handleGameClick = (gameId: number) => {
    setSelectedGame(gameId === selectedGame ? null : gameId);
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || game.category === selectedCategory;
    const matchesStatus = selectedStatus === "" || game.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const mockChallenges = [
    {
      id: 1,
      name: "Survive 100 Waves",
      function_name: "completeWave",
      player_address_variable: "playerAddress",
      countItems: true,
      battles: 2,
      difficulty: "Hard",
      avgCompletionTime: "45 min"
    },
    {
      id: 2,
      name: "Collect Power-ups",
      function_name: "collectPowerup",
      player_address_variable: "player",
      countItems: true,
      battles: 1,
      difficulty: "Medium",
      avgCompletionTime: "15 min"
    }
  ];

  const totalStats = {
    totalGames: games.length,
    totalPlayers: games.reduce((sum, game) => sum + game.totalPlayers, 0),
    totalRevenue: games.reduce((sum, game) => sum + game.revenue, 0),
    avgRating: games.reduce((sum, game) => sum + game.rating, 0) / games.length
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
            <Link to="/manage-activities">
              <Button variant="outline" className="font-rajdhani font-semibold">
                <Settings className="h-4 w-4 mr-2" />
                MANAGE ACTIVITIES
              </Button>
            </Link>
            <Link to="/create-game">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-rajdhani font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                CREATE GAME
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-rajdhani">Revenue</p>
                  <p className="text-3xl font-bold font-orbitron text-green-400">${totalStats.totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-rajdhani">Avg Rating</p>
                  <p className="text-3xl font-bold font-orbitron text-yellow-400">{totalStats.avgRating.toFixed(1)}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-400/60" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-rajdhani font-medium">Search Games</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by game name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-rajdhani font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Action">Action</SelectItem>
                    <SelectItem value="Racing">Racing</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="Puzzle">Puzzle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-rajdhani font-medium">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {filteredGames.map((game) => (
            <Card key={game.id} className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={game.image} 
                      alt={game.name}
                      className="w-24 h-24 rounded-lg object-cover border border-primary/20"
                    />
                    <div>
                      <CardTitle className="text-xl font-orbitron flex items-center gap-2">
                        {game.name}
                        {game.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30">
                            ⭐ Featured
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="font-rajdhani">{game.category}</Badge>
                        <Badge variant={game.status === "active" ? "default" : "outline"} className="font-rajdhani">
                          {game.status}
                        </Badge>
                        <span className="text-yellow-400">★ {game.rating}</span>
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-1 font-rajdhani">
                        Created: {new Date(game.createdAt).toLocaleDateString()} • 
                        Updated: {new Date(game.lastUpdate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGameClick(game.id)}
                      className="font-rajdhani"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {selectedGame === game.id ? "Hide" : "View"}
                    </Button>
                    <Button variant="outline" size="sm" className="font-rajdhani">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="font-rajdhani text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary font-orbitron">{game.challenges}</p>
                    <p className="text-sm text-muted-foreground font-rajdhani">Activities</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent font-orbitron">{game.activeBattles}</p>
                    <p className="text-sm text-muted-foreground font-rajdhani">Active Battles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400 font-orbitron">{game.totalPlayers}</p>
                    <p className="text-sm text-muted-foreground font-rajdhani">Players</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400 font-orbitron">${game.revenue}</p>
                    <p className="text-sm text-muted-foreground font-rajdhani">Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400 font-orbitron">{game.rating}</p>
                    <p className="text-sm text-muted-foreground font-rajdhani">Rating</p>
                  </div>
                </div>

                {selectedGame === game.id && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold font-rajdhani flex items-center gap-2">
                        <Zap className="h-5 w-5 text-accent" />
                        Game Activities
                      </h3>
                      <div className="flex gap-2">
                        <Link to="/manage-activities">
                          <Button size="sm" variant="outline" className="font-rajdhani">
                            <Settings className="h-4 w-4 mr-2" />
                            Manage All
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="font-rajdhani">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Activity
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {mockChallenges.map((challenge) => (
                        <div key={challenge.id} className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-medium font-rajdhani">{challenge.name}</p>
                              <Badge className="text-xs font-rajdhani" variant={
                                challenge.difficulty === 'Easy' ? 'secondary' : 
                                challenge.difficulty === 'Medium' ? 'default' : 'destructive'
                              }>
                                {challenge.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-rajdhani">
                              Function: <code className="bg-muted px-1 rounded">{challenge.function_name}</code> • 
                              Player Variable: <code className="bg-muted px-1 rounded">{challenge.player_address_variable}</code> • 
                              {challenge.battles} battles • Avg time: {challenge.avgCompletionTime}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link to="/create-battle">
                              <Button size="sm" variant="outline" className="font-rajdhani">
                                Create Battle
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" className="font-rajdhani">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
