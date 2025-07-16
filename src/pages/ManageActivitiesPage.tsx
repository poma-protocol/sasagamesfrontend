import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Edit, Trash2, Target, Trophy, Users, Clock } from "lucide-react";

interface Activity {
  id: number;
  name: string;
  game: string;
  gameId: number;
  difficulty: string;
  points: number;
  participants: number;
  completions: number;
  avgTime: string;
  status: string;
  createdAt: string;
}

export function ManageActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const [activities] = useState<Activity[]>([
    {
      id: 1,
      name: "Survive 100 Waves",
      game: "Zombie Apocalypse",
      gameId: 1,
      difficulty: "hard",
      points: 500,
      participants: 1250,
      completions: 320,
      avgTime: "45 min",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Collect Power-ups",
      game: "Zombie Apocalypse",
      gameId: 1,
      difficulty: "medium",
      points: 200,
      participants: 1250,
      completions: 890,
      avgTime: "15 min",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 3,
      name: "Complete Championship",
      game: "Racing Championship",
      gameId: 2,
      difficulty: "expert",
      points: 1000,
      participants: 890,
      completions: 45,
      avgTime: "2 hours",
      status: "active",
      createdAt: "2024-01-20"
    },
    {
      id: 4,
      name: "Find Hidden Treasures",
      game: "Treasure Hunt",
      gameId: 3,
      difficulty: "easy",
      points: 150,
      participants: 450,
      completions: 234,
      avgTime: "30 min",
      status: "inactive",
      createdAt: "2024-01-10"
    }
  ]);

  const games = ["Zombie Apocalypse", "Racing Championship", "Treasure Hunt"];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === "" || activity.game === selectedGame;
    const matchesDifficulty = selectedDifficulty === "" || activity.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesGame && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'hard': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'expert': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCompletionRate = (completions: number, participants: number) => {
    return Math.round((completions / participants) * 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MANAGE ACTIVITIES
              </h1>
              <p className="text-muted-foreground mt-2 font-rajdhani">
                Monitor and manage all game activities across the platform
              </p>
            </div>
          </div>
          <Link to="/admin/create-activity">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-rajdhani font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              CREATE ACTIVITY
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-rajdhani">Total Activities</p>
                  <p className="text-3xl font-bold font-orbitron text-primary">{activities.length}</p>
                </div>
                <Target className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-rajdhani">Active Players</p>
                  <p className="text-3xl font-bold font-orbitron text-accent">
                    {activities.reduce((sum, a) => sum + a.participants, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-rajdhani">Completions</p>
                  <p className="text-3xl font-bold font-orbitron text-green-400">
                    {activities.reduce((sum, a) => sum + a.completions, 0).toLocaleString()}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-green-400/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-rajdhani">Avg Completion</p>
                  <p className="text-3xl font-bold font-orbitron text-yellow-400">
                    {Math.round(activities.reduce((sum, a) => sum + getCompletionRate(a.completions, a.participants), 0) / activities.length)}%
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400/60" />
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
                <label className="text-sm font-rajdhani font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities or games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-rajdhani font-medium">Game</label>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Games" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Games</SelectItem>
                    {games.map(game => (
                      <SelectItem key={game} value={game}>{game}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-rajdhani font-medium">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Table */}
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-orbitron">Activities Overview</CardTitle>
            <CardDescription>
              Manage all activities across your games
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-rajdhani font-semibold">Activity</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Game</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Difficulty</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Points</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Participants</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Completion Rate</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Avg Time</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Status</TableHead>
                  <TableHead className="font-rajdhani font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{activity.name}</TableCell>
                    <TableCell>
                      <Link to={`/admin/manage-games`} className="text-primary hover:underline">
                        {activity.game}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(activity.difficulty)}>
                        {activity.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-accent">{activity.points}</TableCell>
                    <TableCell>{activity.participants.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${getCompletionRate(activity.completions, activity.participants)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {getCompletionRate(activity.completions, activity.participants)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{activity.avgTime}</TableCell>
                    <TableCell>
                      <Badge variant={activity.status === "active" ? "default" : "outline"}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
