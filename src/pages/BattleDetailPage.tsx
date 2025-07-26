import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar, Clock, Users, Trophy, Target, Info, List, ArrowLeft, Gamepad2, Zap, Star, Medal, Crown, Sword, Shield, Heart, Flame
} from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/types";
import { API_CONFIG } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useState } from "react";
import BattleCardActionButton from "@/components/BattleCardActionButton";
export function BattleDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { address } = useAccount();
    const [loading, setLoading] = useState<boolean>(false);
    const { data: battle, isLoading, error, isError } = useQuery({
        queryKey: ["activity", Number(id)],
        queryFn: () => fetchActivity(Number(id)),
        enabled: !!id
    })

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
    };
    if (isError) {
        toast.error("Failed to fetch battle details");
    }

    let joined = false;

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
                                        src={`${API_CONFIG.ACTIVITY_IMAGE_URL}/${battle.image}`}
                                        alt={battle.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Status and Difficulty */}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <Badge className="bg-primary text-primary-foreground font-rajdhani">
                                            {getBattleStatus(battle).toUpperCase()}
                                        </Badge>

                                    </div>

                                    {/* Battle Info Overlay */}
                                    {/* <div className="absolute bottom-6 left-6 right-6">
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
                                    </div> */}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Battle Features */}
                        {/* <Card className="border-primary/20 bg-card">
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
                        </Card> */}

                        {/* Tabs Section */}
                        <Tabs defaultValue="instructions" className="space-y-4">
                            <TabsList className="grid w-full grid-cols-2 bg-card">
                                <TabsTrigger value="instructions" className="font-rajdhani">Instructions</TabsTrigger>
                                {/* <TabsTrigger value="leaderboard" className="font-rajdhani">Leaderboard</TabsTrigger> */}
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

                            {/* <TabsContent value="leaderboard">
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
                            </TabsContent> */}

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

                                    {/* <div className="w-full bg-secondary rounded-full h-3">
                                        <div
                                            className={`bg-gradient-to-r ${getProgressColor(battle.currentProgress)} h-3 rounded-full transition-all duration-500`}
                                            style={{ width: `${battle.currentProgress}%` }}
                                        />
                                    </div> */}
                                    <div className="flex justify-between text-xs text-muted-foreground font-rajdhani">
                                        <span>0</span>
                                        <span>{battle.goal} objectives</span>
                                    </div>
                                </div>
                                <Separator />
                                <BattleCardActionButton id={battle.id} status={battle.status} maxPlayers={battle.maxPlayers} playerCount={battle.playerCount} joined={joined}/>

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
                                        <p className="font-rajdhani font-semibold">{formatDate(battle.startDate)}</p>
                                    </div>
                                    <div className="text-center">
                                        <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                                        <p className="text-xs text-muted-foreground font-rajdhani">End Date</p>
                                        <p className="font-rajdhani font-semibold">{formatDate(battle.endDate)}</p>
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
async function fetchActivity(activityId: number) {
    try {
        const response = await axios.get<Activity>(`${API_CONFIG.BACKEND_URL}/activity/one/${activityId}`);
        if (response.status !== 200) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        return response.data;
    }
    catch (error) {
        console.error("Error fetching activity:", error);
        throw new Error("Failed to fetch activity data");
    }

}
function getBattleStatus(battle: Activity) {
    const currentDate = new Date();
    const startDate = new Date(battle.startDate);
    const endDate = new Date(battle.endDate);
    if (currentDate < startDate) {
        return "upcoming";
    } else if (currentDate >= startDate && currentDate <= endDate) {
        return "active";
    } else {
        return "completed";
    }
}
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};
