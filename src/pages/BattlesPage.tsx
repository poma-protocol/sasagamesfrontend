import { useState } from "react";
import { BattleCard } from "@/components/BattleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, Trophy } from "lucide-react";

// Game images mapping
const gameImages = {
  "God of War": "/lovable-uploads/ce11f41d-57a8-4a0a-8bc1-3dc66db8c318.png",
  "FIFA 22": "/lovable-uploads/62fb7c52-a279-4f8c-bdb5-65b1c244f2bc.png",
  "Pirate Nation": "/lovable-uploads/5d0f9609-6bf9-45db-bfde-86e1441e22b5.png"
};

// Mock data for battles
const mockBattles = [
  {
    id: 1,
    name: "Viking Warrior Challenge",
    image: gameImages["God of War"],
    reward: 0.8,
    playerCount: 245,
    maxPlayers: 500,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active" as const,
    game: "God of War",
    category: "Action",
    challengeName: "Complete Norse Saga"
  },
  {
    id: 2,
    name: "Champions League Quest",
    image: gameImages["FIFA 22"],
    reward: 0.6,
    playerCount: 189,
    maxPlayers: 300,
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    status: "active" as const,
    game: "FIFA 22",
    category: "Sports",
    challengeName: "Win Championship"
  },
  {
    id: 3,
    name: "Treasure Hunt Expedition",
    image: gameImages["Pirate Nation"],
    reward: 0.7,
    playerCount: 156,
    maxPlayers: 400,
    startDate: "2024-01-10",
    endDate: "2024-01-31",
    status: "active" as const,
    game: "Pirate Nation",
    category: "Adventure",
    challengeName: "Find Golden Treasure"
  },
  {
    id: 4,
    name: "Legends Championship",
    image: gameImages["FIFA 22"],
    reward: 0.5,
    playerCount: 180,
    maxPlayers: 250,
    startDate: "2024-01-08",
    endDate: "2024-01-25",
    status: "completed" as const,
    game: "FIFA 22",
    category: "Sports",
    challengeName: "Ultimate Team Battle"
  },
  {
    id: 5,
    name: "Pirate Fleet Commander",
    image: gameImages["Pirate Nation"],
    reward: 0.9,
    playerCount: 67,
    maxPlayers: 150,
    startDate: "2024-01-25",
    endDate: "2024-02-25",
    status: "upcoming" as const,
    game: "Pirate Nation",
    category: "Strategy",
    challengeName: "Command Your Fleet"
  },
  {
    id: 6,
    name: "Ragnarok Challenge",
    image: gameImages["God of War"],
    reward: 1.2,
    playerCount: 234,
    maxPlayers: 600,
    startDate: "2024-01-12",
    endDate: "2024-02-12",
    status: "upcoming" as const,
    game: "God of War",
    category: "Action",
    challengeName: "Survive Ragnarok"
  }
];

export function BattlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [rewardRange, setRewardRange] = useState("all");

  // Extract unique values for filters
  const games = [...new Set(mockBattles.map(battle => battle.game))];
  const categories = [...new Set(mockBattles.map(battle => battle.category))];

  // Filter battles based on current filters
  const filteredBattles = mockBattles.filter(battle => {
    const matchesSearch = battle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         battle.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         battle.challengeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGame = selectedGame === "all" || battle.game === selectedGame;
    const matchesCategory = selectedCategory === "all" || battle.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || battle.status === selectedStatus;
    
    const matchesReward = (() => {
      switch (rewardRange) {
        case "0-2": return battle.reward >= 0 && battle.reward <= 2;
        case "2-5": return battle.reward > 2 && battle.reward <= 5;
        case "5+": return battle.reward > 5;
        default: return true;
      }
    })();

    return matchesSearch && matchesGame && matchesCategory && matchesStatus && matchesReward;
  });

  const handleJoinBattle = (id: number) => {
    // TODO: Implement join battle logic
    console.log("Joining battle:", id);
  };

  const handleViewBattle = (id: number) => {
    // TODO: Navigate to battle detail page
    console.log("Viewing battle:", id);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedGame("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setRewardRange("all");
  };

  const activeFiltersCount = [
    selectedGame !== "all",
    selectedCategory !== "all", 
    selectedStatus !== "all",
    rewardRange !== "all"
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron font-bold text-4xl md:text-6xl mb-4">
            <span className="text-gradient">EPIC BATTLES</span>
          </h1>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your challenge, prove your skills, and earn incredible rewards in the ultimate gaming arena.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search battles, games, or challenges..."
              className="pl-10 bg-input border-border font-rajdhani"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="bg-input border-border font-rajdhani">
                <SelectValue placeholder="All Games" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                {games.map(game => (
                  <SelectItem key={game} value={game}>{game}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-input border-border font-rajdhani">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-input border-border font-rajdhani">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={rewardRange} onValueChange={setRewardRange}>
              <SelectTrigger className="bg-input border-border font-rajdhani">
                <SelectValue placeholder="All Rewards" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rewards</SelectItem>
                <SelectItem value="0-2">0-2 ETH</SelectItem>
                <SelectItem value="2-5">2-5 ETH</SelectItem>
                <SelectItem value="5+">5+ ETH</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="font-rajdhani font-semibold"
              disabled={activeFiltersCount === 0}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Clear Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="font-orbitron font-bold text-2xl text-foreground">
              {filteredBattles.length} Battles Found
            </h2>
            {searchTerm && (
              <Badge variant="outline" className="font-rajdhani">
                Search: "{searchTerm}"
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Trophy className="h-5 w-5" />
            <span className="font-rajdhani">
              Total Rewards: {filteredBattles.reduce((sum, battle) => sum + battle.reward, 0).toFixed(1)} ETH
            </span>
          </div>
        </div>

        {/* Battles Grid */}
        {filteredBattles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBattles.map((battle) => (
              <BattleCard
                key={battle.id}
                {...battle}
                onJoin={handleJoinBattle}
                onView={handleViewBattle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-orbitron font-bold text-2xl text-foreground mb-2">
              No Battles Found
            </h3>
            <p className="font-rajdhani text-lg text-muted-foreground mb-6">
              Try adjusting your search criteria or filters to find more battles.
            </p>
            <Button onClick={clearAllFilters} className="btn-gradient font-rajdhani font-semibold">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
