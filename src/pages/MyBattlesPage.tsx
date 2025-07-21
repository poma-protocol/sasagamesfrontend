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
import { useQuery } from "@tanstack/react-query";
import { MyBattle } from "@/types";
import axios from "axios";
import { API_CONFIG } from "@/config";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
export function MyBattlesPage() {
    const [activeTab, setActiveTab] = useState("active");
    const { address: userAddress } = useAccount();
    if (!userAddress) {
        toast.error("Please connect your wallet to view your battles.");
        return null;
    }
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['userBattles', userAddress],
        queryFn: () => fetchUserBattles(userAddress),
    })
    console.log("User Address:", userAddress);
    console.log("Fetched Battles:", data);
    if (isLoading) {
        return <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>
        </div>;
    }
    if (isError) {
        toast.error("Failed to load battles. Please try again later.");
    }
    const getFilteredBattles = (status: string) => {
        if (!data) return [];

        const currentDate = new Date();

        switch (status) {
            case "active":
                // Battle is active if it has started but not ended, and user hasn't completed it
                return data.filter(battle => {
                    const startDate = new Date(battle.startDate);
                    const endDate = new Date(battle.endDate);
                    return startDate <= currentDate &&
                        currentDate <= endDate &&
                        !battle.userdone &&
                        !battle.battleDone;
                });

            case "completed":
                // Battle is completed if user has finished it or the battle itself is done
                return data.filter(battle => battle.userdone || battle.battleDone);

            case "upcoming":
                // Battle is upcoming if start date is in the future
                return data.filter(battle => {
                    const startDate = new Date(battle.startDate);
                    return startDate > currentDate;
                });

            case "expired":
                // Battle has ended but user didn't complete it
                return data.filter(battle => {
                    const endDate = new Date(battle.endDate);
                    return currentDate > endDate && !battle.userdone && !battle.battleDone;
                });

            default:
                return data;
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
        if (!data) return 0;

        return data
            .filter(battle => battle.userdone || battle.battleDone)
            .reduce((sum, battle) => sum + battle.reward, 0);
    };

    const getActiveBattlesCount = () => {
        return getFilteredBattles("active").length;
    };

    const getCompletedBattlesCount = () => {
        return getFilteredBattles("completed").length;
    };

    const getUpcomingBattlesCount = () => {
        return getFilteredBattles("upcoming").length;
    };

    const getExpiredBattlesCount = () => {
        return getFilteredBattles("expired").length;
    };;

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
                        className={`absolute top-3 right-3 font-rajdhani font-semibold ${battle.status === "completed"
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
                            Started: {formatDate(battle.startDate)}
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
                    className={`w-full font-rajdhani font-semibold ${battle.status === "completed"
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
                            All ({data?.length || 0})
                        </TabsTrigger>
                        <TabsTrigger value="active" className="font-rajdhani font-semibold">
                            Active ({getActiveBattlesCount()})
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="font-rajdhani font-semibold">
                            Completed ({getCompletedBattlesCount()})
                        </TabsTrigger>
                        <TabsTrigger value="upcoming" className="font-rajdhani font-semibold">
                            Upcoming ({getUpcomingBattlesCount()})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data.map((battle) => (
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
async function fetchUserBattles(userAddress: string): Promise<MyBattle[]> {
    try {
        const response = await axios.get(`${API_CONFIG.BACKEND_URL}/activity/my-battles/${userAddress}`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch user battles");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching user battles:", error);
        throw error;
    }
}
