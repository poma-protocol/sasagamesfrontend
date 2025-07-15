import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Users, Trophy, Target, Info, List } from "lucide-react";

export function BattleDetailPage() {
  const { id } = useParams();
  
  // Mock battle data - in real app, this would come from API
  const battle = {
    id: id,
    name: "Zombie Survival Challenge",
    image: "/api/placeholder/800/400",
    reward: "0.5 ETH",
    goal: 100,
    currentProgress: 45,
    maxPlayers: 500,
    currentPlayers: 234,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    game: "Zombie Apocalypse",
    category: "Action",
    status: "active",
    instructions: [
      "Connect your wallet to join the battle",
      "Survive 100 waves of zombies in the game",
      "Each wave completion counts toward your progress",
      "Battle ends when time runs out or goal is reached"
    ],
    about: "Test your survival skills in this intense zombie apocalypse challenge. Fight through waves of undead enemies and prove you're the ultimate survivor. Only the strongest will claim the rewards!"
  };

  const handleJoinBattle = () => {
    // In real app, this would trigger the join logic
    console.log("Joining battle:", id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-primary/20 bg-card">
              <CardHeader className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={battle.image} 
                    alt={battle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {battle.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent">
                    {battle.name}
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {battle.game} • {battle.category}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Battle Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{battle.reward}</p>
                    <p className="text-sm text-muted-foreground">Reward</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{battle.goal}</p>
                    <p className="text-sm text-muted-foreground">Goal</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{battle.currentPlayers}/{battle.maxPlayers}</p>
                    <p className="text-sm text-muted-foreground">Players</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Days Left</p>
                  </div>
                </div>

                <Separator />

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <List className="h-5 w-5" />
                    Instructions
                  </h3>
                  <ul className="space-y-2">
                    {battle.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* About */}
                {battle.about && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      About This Battle
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {battle.about}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Battle Card */}
            <Card className="border-primary/20 bg-card">
              <CardHeader>
                <CardTitle>Join Battle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{battle.currentProgress}/{battle.goal}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary-end h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(battle.currentProgress / battle.goal) * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleJoinBattle}
                  className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity"
                >
                  JOIN BATTLE
                </Button>
              </CardContent>
            </Card>

            {/* Battle Info */}
            <Card className="border-primary/20 bg-card">
              <CardHeader>
                <CardTitle>Battle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">{battle.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">{battle.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Max Players</p>
                    <p className="text-sm text-muted-foreground">{battle.maxPlayers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}