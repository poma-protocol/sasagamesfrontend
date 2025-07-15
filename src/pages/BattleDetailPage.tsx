import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Users, 
  Trophy, 
  Target, 
  Info, 
  List, 
  ArrowLeft,
  Gamepad2,
  Zap,
  Star,
  Medal,
  Crown,
  Sword,
  Shield,
  Heart,
  Flame
} from "lucide-react";

export function BattleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Game images mapping
  const gameImages = {
    "God of War": "/lovable-uploads/ce11f41d-57a8-4a0a-8bc1-3dc66db8c318.png",
    "FIFA 22": "/lovable-uploads/62fb7c52-a279-4f8c-bdb5-65b1c244f2bc.png",
    "Pirate Nation": "/lovable-uploads/5d0f9609-6bf9-45db-bfde-86e1441e22b5.png"
  };

  // Mock battle data - in real app, this would come from API
  const battleData = {
    1: {
      name: "Viking Warrior Challenge",
      game: "God of War",
      image: gameImages["God of War"],
      reward: "0.8 ETH",
      category: "Action",
      difficulty: "Legendary",
      estimatedTime: "3-5 hours",
      about: "Embark on an epic journey through the Norse realms. Face mythical creatures, solve ancient puzzles, and prove your worth as a true Viking warrior. Only the bravest will claim victory in this legendary challenge."
    },
    2: {
      name: "Champions League Quest",
      game: "FIFA 22",
      image: gameImages["FIFA 22"],
      reward: "0.6 ETH",
      category: "Sports",
      difficulty: "Professional",
      estimatedTime: "2-3 hours",
      about: "Rise through the ranks and claim your place among football legends. Master your skills, build the ultimate team, and compete in the most prestigious tournament in virtual football."
    },
    3: {
      name: "Treasure Hunt Expedition",
      game: "Pirate Nation",
      image: gameImages["Pirate Nation"],
      reward: "0.7 ETH",
      category: "Adventure",
      difficulty: "Hard",
      estimatedTime: "4-6 hours",
      about: "Set sail across dangerous seas, discover hidden islands, and claim the greatest treasure known to pirate-kind. Navigate treacherous waters and outsmart rival pirates in this ultimate seafaring adventure."
    }
  };

  const currentBattle = battleData[id as keyof typeof battleData] || battleData[1];
  
  const battle = {
    id: id,
    ...currentBattle,
    goal: 100,
    currentProgress: 45,
    maxPlayers: 500,
    currentPlayers: 234,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active",
    instructions: [
      "Connect your wallet to join the battle",
      "Complete the main storyline objectives",
      "Each milestone completion counts toward your progress",
      "Battle ends when time runs out or goal is reached",
      "Top performers get bonus rewards"
    ],
    leaderboard: [
      { rank: 1, player: "LegendaryWarrior", progress: 87, reward: "0.15 ETH" },
      { rank: 2, player: "ChampionSlayer", progress: 82, reward: "0.10 ETH" },
      { rank: 3, player: "EliteGamer", progress: 78, reward: "0.08 ETH" },
      { rank: 4, player: "ProPlayer", progress: 71, reward: "0.05 ETH" },
      { rank: 5, player: "SkillMaster", progress: 65, reward: "0.02 ETH" }
    ],
    features: [
      { icon: Zap, title: "Real-time Progress", description: "Track your progress live" },
      { icon: Trophy, title: "Tiered Rewards", description: "Multiple reward tiers based on performance" },
      { icon: Users, title: "Multiplayer", description: "Compete with up to 500 players" },
      { icon: Target, title: "Skill-based", description: "Rewards based on actual gameplay skill" }
    ]
  };

  const handleJoinBattle = () => {
    console.log("Joining battle:", id);
    // In real app, this would trigger the join logic
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-green-500 to-emerald-500";
    if (progress >= 60) return "from-yellow-500 to-orange-500";
    if (progress >= 40) return "from-orange-500 to-red-500";
    return "from-red-500 to-red-600";
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Star className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/battles')}
          className="mb-6 font-rajdhani"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Battles
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="border-primary/20 bg-card overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <img 
                    src={battle.image} 
                    alt={battle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Status and Difficulty */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-primary text-primary-foreground font-rajdhani">
                      {battle.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="bg-red-500/20 border-red-500 text-red-300 font-rajdhani">
                      <Flame className="h-3 w-3 mr-1" />
                      {battle.difficulty}
                    </Badge>
                  </div>

                  {/* Battle Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-2">
                      {battle.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4" />
                        <span className="font-rajdhani">{battle.game}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-rajdhani">{battle.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        <span className="font-orbitron font-bold text-lg">{battle.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Battle Features */}
            <Card className="border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Battle Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {battle.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/20 border border-primary/10">
                      <feature.icon className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-rajdhani font-semibold text-foreground">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="instructions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-card">
                <TabsTrigger value="instructions" className="font-rajdhani">Instructions</TabsTrigger>
                <TabsTrigger value="leaderboard" className="font-rajdhani">Leaderboard</TabsTrigger>
                <TabsTrigger value="about" className="font-rajdhani">About</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions">
                <Card className="border-primary/20 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-orbitron">
                      <List className="h-5 w-5" />
                      Battle Instructions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {battle.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-7 h-7 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold font-rajdhani">
                            {index + 1}
                          </span>
                          <span className="font-rajdhani">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="leaderboard">
                <Card className="border-primary/20 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-orbitron">
                      <Trophy className="h-5 w-5" />
                      Current Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {battle.leaderboard.map((player) => (
                        <div key={player.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/10">
                          <div className="flex items-center gap-3">
                            {getRankIcon(player.rank)}
                            <div>
                              <p className="font-rajdhani font-semibold text-foreground">#{player.rank} {player.player}</p>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={player.progress} 
                                  className="w-24 h-2"
                                />
                                <span className="text-sm text-muted-foreground font-rajdhani">
                                  {player.progress}%
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-orbitron font-bold text-primary">{player.reward}</p>
                            <p className="text-xs text-muted-foreground font-rajdhani">Potential Reward</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about">
                <Card className="border-primary/20 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-orbitron">
                      <Info className="h-5 w-5" />
                      About This Battle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed font-rajdhani text-lg">
                      {battle.about}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Battle Card */}
            <Card className="border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Join the Battle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-rajdhani text-muted-foreground">Overall Progress</span>
                    <span className="font-rajdhani font-semibold">{battle.currentProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${getProgressColor(battle.currentProgress)} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${battle.currentProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground font-rajdhani">
                    <span>0</span>
                    <span>{battle.goal} objectives</span>
                  </div>
                </div>
                
                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-muted-foreground">Players</span>
                    <span className="font-rajdhani font-semibold">{battle.currentPlayers}/{battle.maxPlayers}</span>
                  </div>
                  <Progress value={(battle.currentPlayers / battle.maxPlayers) * 100} className="h-2" />
                </div>
                
                <Button 
                  onClick={handleJoinBattle}
                  className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity font-rajdhani font-bold"
                  disabled={battle.currentPlayers >= battle.maxPlayers}
                >
                  <Sword className="mr-2 h-5 w-5" />
                  {battle.currentPlayers >= battle.maxPlayers ? "BATTLE FULL" : "JOIN BATTLE"}
                </Button>
              </CardContent>
            </Card>

            {/* Battle Stats */}
            <Card className="border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Battle Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground font-rajdhani">Start Date</p>
                    <p className="font-rajdhani font-semibold">{battle.startDate}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground font-rajdhani">End Date</p>
                    <p className="font-rajdhani font-semibold">{battle.endDate}</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground font-rajdhani">Difficulty</p>
                    <p className="font-rajdhani font-semibold text-red-400">{battle.difficulty}</p>
                  </div>
                  <div className="text-center">
                    <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground font-rajdhani">Category</p>
                    <p className="font-rajdhani font-semibold">{battle.category}</p>
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
