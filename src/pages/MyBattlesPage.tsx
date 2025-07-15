import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Calendar, 
  Target, 
  Clock, 
  CheckCircle, 
  PlayCircle,
  Award,
  TrendingUp
} from "lucide-react";

// Mock data for user's battles
const mockUserBattles = [
  {
    id: 1,
    name: "Dragon Slayer Championship",
    image: "/api/placeholder/400/300",
    reward: 5.5,
    goal: 1,
    current: 1,
    status: "completed",
    joinedDate: "2024-01-15",
    completedDate: "2024-01-28",
    earnedReward: 5.5,
    game: "Fantasy Quest",
    challengeName: "Defeat Ancient Dragon"
  },
  {
    id: 2,
    name: "Space Conquest Arena",
    image: "/api/placeholder/400/300",
    reward: 7.8,
    goal: 5,
    current: 3,
    status: "active",
    joinedDate: "2024-01-10",
    endDate: "2024-01-31",
    game: "Galactic Wars",
    challengeName: "Conquer 5 Planets"
  },
  {
    id: 3,
    name: "Puzzle Master Quest",
    image: "/api/placeholder/400/300",
    reward: 1.8,
    goal: 100,
    current: 67,
    status: "active",
    joinedDate: "2024-01-12",
    endDate: "2024-02-12",
    game: "Mind Bender",
    challengeName: "Solve 100 Puzzles"
  },
  {
    id: 4,
    name: "Racing Championship",
    image: "/api/placeholder/400/300",
    reward: 2.1,
    goal: 10,
    current: 8,
    status: "expired",
    joinedDate: "2024-01-08",
    endDate: "2024-01-25",
    game: "Speed Racers",
    challengeName: "Win 10 Races"
  },
  {
    id: 5,
    name: "Crypto Miners Rally",
    image: "/api/placeholder/400/300",
    reward: 3.2,
    goal: 1000,
    current: 0,
    status: "upcoming",
    joinedDate: "2024-01-18",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    game: "Mining Simulator",
    challengeName: "Mine 1000 Coins"
  }
];

export function MyBattlesPage() {
  const [activeTab, setActiveTab] = useState("active");

  const getFilteredBattles = (status: string) => {
    switch (status) {
      case "active":
        return mockUserBattles.filter(battle => battle.status === "active");
      case "completed":
        return mockUserBattles.filter(battle => battle.status === "completed");
      case "upcoming":
        return mockUserBattles.filter(battle => battle.status === "upcoming");
      default:
        return mockUserBattles;
    }
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTotalEarnings = () => {
    return mockUserBattles
      .filter(battle => battle.status === "completed")
      .reduce((sum, battle) => sum + (battle.earnedReward || 0), 0);
  };

  const getActiveBattlesCount = () => {
    return mockUserBattles.filter(battle => battle.status === "active").length;
  };

  const getCompletedBattlesCount = () => {
    return mockUserBattles.filter(battle => battle.status === "completed").length;
  };

  const BattleCard = ({ battle }: { battle: any }) => (
    <Card className="game-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={battle.image}
            alt={battle.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Status Badge */}
          <Badge
            className={`absolute top-3 right-3 font-rajdhani font-semibold ${
              battle.status === "completed"
                ? "bg-green-500"
                : battle.status === "active"
                ? "bg-blue-500"
                : battle.status === "upcoming"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {battle.status.toUpperCase()}
          </Badge>

          {/* Reward */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="font-orbitron font-bold text-white text-lg">
              {battle.reward} ETH
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Battle Name */}
        <h3 className="font-orbitron font-bold text-xl text-foreground">
          {battle.name}
        </h3>

        {/* Game & Challenge */}
        <div className="space-y-1">
          <p className="font-rajdhani text-accent font-semibold">{battle.game}</p>
          <p className="font-rajdhani text-sm text-muted-foreground">{battle.challengeName}</p>
        </div>

        {/* Progress */}
        {battle.status === "active" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-rajdhani text-muted-foreground">Progress</span>
              <span className="font-rajdhani font-semibold text-foreground">
                {battle.current}/{battle.goal}
              </span>
            </div>
            <Progress 
              value={getProgressPercentage(battle.current, battle.goal)} 
              className="h-2"
            />
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="font-rajdhani">
              Joined: {formatDate(battle.joinedDate)}
            </span>
          </div>
          {battle.status === "completed" && battle.completedDate && (
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="font-rajdhani">
                {formatDate(battle.completedDate)}
              </span>
            </div>
          )}
          {battle.status === "active" && battle.endDate && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className="font-rajdhani">
                Ends: {formatDate(battle.endDate)}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          className={`w-full font-rajdhani font-semibold ${
            battle.status === "completed"
              ? "btn-neon"
              : battle.status === "active"
              ? "btn-gradient"
              : "btn-neon"
          }`}
          disabled={battle.status === "expired"}
        >
          {battle.status === "completed" && (
            <>
              <Award className="mr-2 h-4 w-4" />
              Reward Claimed
            </>
          )}
          {battle.status === "active" && (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue Battle
            </>
          )}
          {battle.status === "upcoming" && (
            <>
              <Clock className="mr-2 h-4 w-4" />
              Starting Soon
            </>
          )}
          {battle.status === "expired" && "Expired"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron font-bold text-4xl md:text-6xl mb-4">
            MY <span className="text-gradient">BATTLES</span>
          </h1>
          <p className="font-rajdhani text-xl text-muted-foreground">
            Track your progress and claim your rewards
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center glow-primary">
            <CardContent className="space-y-2">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto" />
              <div className="font-orbitron font-bold text-3xl text-foreground">
                {getTotalEarnings().toFixed(1)} ETH
              </div>
              <div className="font-rajdhani text-muted-foreground">
                Total Earnings
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 text-center glow-primary">
            <CardContent className="space-y-2">
              <PlayCircle className="h-8 w-8 text-blue-500 mx-auto" />
              <div className="font-orbitron font-bold text-3xl text-foreground">
                {getActiveBattlesCount()}
              </div>
              <div className="font-rajdhani text-muted-foreground">
                Active Battles
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 text-center glow-primary">
            <CardContent className="space-y-2">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
              <div className="font-orbitron font-bold text-3xl text-foreground">
                {getCompletedBattlesCount()}
              </div>
              <div className="font-rajdhani text-muted-foreground">
                Completed Battles
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Battles Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card">
            <TabsTrigger value="all" className="font-rajdhani font-semibold">
              All ({mockUserBattles.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="font-rajdhani font-semibold">
              Active ({getActiveBattlesCount()})
            </TabsTrigger>
            <TabsTrigger value="completed" className="font-rajdhani font-semibold">
              Completed ({getCompletedBattlesCount()})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="font-rajdhani font-semibold">
              Upcoming ({mockUserBattles.filter(b => b.status === "upcoming").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockUserBattles.map((battle) => (
                <BattleCard key={battle.id} battle={battle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredBattles("active").map((battle) => (
                <BattleCard key={battle.id} battle={battle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredBattles("completed").map((battle) => (
                <BattleCard key={battle.id} battle={battle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredBattles("upcoming").map((battle) => (
                <BattleCard key={battle.id} battle={battle} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}