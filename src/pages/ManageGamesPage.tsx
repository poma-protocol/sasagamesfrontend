import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Eye, Edit, Trash2 } from "lucide-react";

export function ManageGamesPage() {
  const [games] = useState([
    {
      id: 1,
      name: "Zombie Apocalypse",
      category: "Action",
      image: "/api/placeholder/300/200",
      challenges: 3,
      activeBattles: 2,
      totalPlayers: 1250,
      status: "active"
    },
    {
      id: 2,
      name: "Racing Championship",
      category: "Racing",
      image: "/api/placeholder/300/200",
      challenges: 5,
      activeBattles: 1,
      totalPlayers: 890,
      status: "active"
    },
    {
      id: 3,
      name: "Treasure Hunt",
      category: "Adventure",
      image: "/api/placeholder/300/200",
      challenges: 2,
      activeBattles: 0,
      totalPlayers: 450,
      status: "inactive"
    }
  ]);

  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const handleGameClick = (gameId: number) => {
    setSelectedGame(gameId === selectedGame ? null : gameId);
  };

  const mockChallenges = [
    {
      id: 1,
      name: "Survive 100 Waves",
      function_name: "completeWave",
      player_address_variable: "playerAddress",
      countItems: true,
      battles: 2
    },
    {
      id: 2,
      name: "Collect Power-ups",
      function_name: "collectPowerup",
      player_address_variable: "player",
      countItems: true,
      battles: 1
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent">
              MANAGE GAMES
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your registered games and their challenges
            </p>
          </div>
          <Link to="/register-game">
            <Button className="bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4 mr-2" />
              REGISTER NEW GAME
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {games.map((game) => (
            <Card key={game.id} className="border-primary/20 bg-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={game.image} 
                      alt={game.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl">{game.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{game.category}</Badge>
                        <Badge variant={game.status === "active" ? "default" : "outline"}>
                          {game.status}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGameClick(game.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {selectedGame === game.id ? "Hide" : "View"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{game.challenges}</p>
                    <p className="text-sm text-muted-foreground">Challenges</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{game.activeBattles}</p>
                    <p className="text-sm text-muted-foreground">Active Battles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{game.totalPlayers}</p>
                    <p className="text-sm text-muted-foreground">Total Players</p>
                  </div>
                </div>

                {selectedGame === game.id && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Challenges</h3>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Challenge
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {mockChallenges.map((challenge) => (
                        <div key={challenge.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                          <div>
                            <p className="font-medium">{challenge.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Function: {challenge.function_name} • 
                              Player Variable: {challenge.player_address_variable} • 
                              {challenge.battles} battles using this challenge
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link to="/create-battle">
                              <Button size="sm" variant="outline">
                                Create Battle
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
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