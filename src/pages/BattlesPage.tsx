import { useEffect, useState } from "react";
import { BattleCard } from "@/components/BattleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { FeaturedDeal, featuredDealsSchema, gameAndCategoriesSchema, GameCategories } from "@/types";
import { useAccount } from "wagmi";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
interface NextPreviousBattlesProps {
  page: number,
  changePageNumber: (increase: boolean) => void;
}

function NextPreviousBattles(props: NextPreviousBattlesProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-8">
      <Button onClick={() => props.changePageNumber(false)}><ArrowLeft /></Button>
      <div>{props.page}</div>
      <Button onClick={() => props.changePageNumber(true)}><ArrowRight /></Button>
    </div>
  );
}

export function BattlesPage() {
  const { address } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [rewardRange, setRewardRange] = useState("all");
  const [games, setGames] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([])
  const [page, setPage] = useState<number>(1);
  const [filteredActivities, setFilteredActivities] = useState<FeaturedDeal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getGamesAndCategories() {
      try {
        const data = await axios.get(`${VITE_BACKEND_URL}/game`);
        const res: GameCategories[] = [];

        for (const d of data.data) {
          const parsed = gameAndCategoriesSchema.safeParse(d);
          if (parsed.success) {
            res.push(parsed.data)
          }
        }


        const gamesFromBackend = [...new Set(res.map(battle => battle.name))]
        const categoriesFromBackend = [...new Set(res.map(battle => battle.category))]

        setGames(gamesFromBackend);
        setCategories(categoriesFromBackend);

      } catch (err) {
        console.error("Error getting featured deals", err);
        toast.error("Could not get games and categories");
      }
    }

    async function getInitialGames() {
      try {
        const data = await axios.get(`${VITE_BACKEND_URL}/activity/filter`, {
          params: {
            page
          }
        });

        const activities: FeaturedDeal[] = [];

        for (const d of data.data) {
          const parsed = featuredDealsSchema.safeParse(d);
          if (parsed.success) {
            activities.push(d);
          }
        }

        setFilteredActivities(activities);
      } catch (err) {
        console.error("Error getting initial activities", err);
        toast.error("Could not get activities")
      }
    }

    setLoading(true);
    getGamesAndCategories();
    getInitialGames();
    setLoading(false);
  }, [address]);


  async function changePage(increase: boolean) {
    if (increase === true) {
      setPage(page + 1);
      filterBattles();
    } else {
      if (page !== 1) {
        setPage(page - 1);
        filterBattles();
      }
    }
  }

  async function filterBattles() {
    try {
      setLoading(true);

      const data = await axios.get(`${VITE_BACKEND_URL}/activity/filter`, {
        params: {
          page: page,
          search: searchTerm,
          game: selectedGame,
          category: selectedCategory,
          status: selectedStatus,
          rewards: rewardRange,
        }
      });

      const activities: FeaturedDeal[] = [];

      for (const d of data.data) {
        const parsed = featuredDealsSchema.safeParse(d);
        if (parsed.success) {
          activities.push(d);
        }
      }

      setFilteredActivities(activities);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error filtering battles", err);
      toast.error("Could not filter battles");
    }
  }

  const handleJoinBattle = (id: number) => {
    // TODO: Implement join battle logic
    console.log("Joining battle:", id);
  };

  const handleViewBattle = (id: number) => {
    // TODO: Navigate to battle detail page
    console.log("Viewing battle:", id);
  };

  const clearAllFilters = () => {
    setPage(1);
    setSearchTerm("");
    setSelectedGame("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setRewardRange("all");
    filterBattles();
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
              onBlur={(e) => {
                setSearchTerm(e.target.value);
                filterBattles()
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={selectedGame} onValueChange={(game) => {
              setSelectedGame(game);
              filterBattles();
            }}>
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

            <Select value={selectedCategory} onValueChange={(category) => {
              setSelectedCategory(category);
              filterBattles();
            }}>
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

            <Select value={selectedStatus} onValueChange={(status) => {
              setSelectedStatus(status);
              filterBattles()
            }}>
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

            <Select value={rewardRange} onValueChange={(reward) => {
              setRewardRange(reward);
              filterBattles();
            }}>
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
              {filteredActivities.length} Battles Found
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
              Total Rewards: {filteredActivities.reduce((sum, battle) => sum + battle.reward, 0).toFixed(1)} ETH
            </span>
          </div>
        </div>

        {/* Battles Grid */}
        {loading === false ? filteredActivities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((battle) => (
              <BattleCard
                key={battle.id}
                {...battle}
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
        ) : (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-orbitron font-bold text-2xl text-foreground mb-2">
              Getting battles
            </h3>
            <p className="font-rajdhani text-lg text-muted-foreground mb-6">
              Battles are loading
            </p>
            <Button onClick={clearAllFilters} className="btn-gradient font-rajdhani font-semibold">
              Clear All Filters
            </Button>
          </div>
        )}

        <NextPreviousBattles page={page} changePageNumber={changePage}/>
      </div>
    </div>
  );
}
