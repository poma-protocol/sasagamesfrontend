import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Clock, Trophy, ArrowLeft, Gamepad2, Zap,
    Eye,
    Plus
} from "lucide-react";;
import { useQuery } from "@tanstack/react-query";
import { API_CONFIG } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState } from "react";
import { FeaturedDeal, featuredDealsSchema, gameChallengesSchema, GameDetails, gameDetailsSchema, GamesChallenges } from "@/types";
import axios from "axios";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { createChallengeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import InfoHover from "@/components/InfoHover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

async function getGameDetails(id: number): Promise<GameDetails | null> {
    try {
        const res = await axios.get(`${API_CONFIG.BACKEND_URL}/game/game/${id}`);
        if (!res.data) {
            return null;
        }

        const parsed = gameDetailsSchema.safeParse(res.data);
        if (parsed.success) {
            return parsed.data;
        } else {
            console.log(parsed.error.issues);
            return null;
        }
    } catch (err) {
        toast.error("Error getting game details");
        console.error("Error getting game details", err);
    }
}

async function getGameChallenges(id: number): Promise<GamesChallenges[]> {
    try {
        const res = await axios.get(`${API_CONFIG.BACKEND_URL}/game/challenges/${id}`);

        const challenges: GamesChallenges[] = [];
        for (const c of res.data) {
            const parsed = gameChallengesSchema.safeParse(c);
            if (parsed.success) {
                challenges.push(parsed.data);
            }
        }

        return challenges;
    } catch (err) {
        console.error("Error getting game challenges", err);
        toast.error("Could not get game's challenges");
    }
}


export function GameDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const [selectedChallenge, setSelectedChallenge] = useState<number>(0);
    const [battles, setBattles] = useState<FeaturedDeal[]>([]);
    const [battlesLoading, setBattlesLoading] = useState<boolean>(false);
    const { data: game, isLoading, error, isError } = useQuery({
        queryKey: ["game", Number(id)],
        queryFn: () => getGameDetails(Number(id)),
        enabled: !!id
    })
    const { data: challenges, isLoading: challengesLoading } = useQuery({
        queryKey: ["gameChallenges", Number(id)],
        queryFn: () => getGameChallenges(Number(id)),
        enabled: !!id
    })

    const form = useForm<z.infer<typeof createChallengeSchema>>({
        resolver: zodResolver(createChallengeSchema),
        defaultValues: {
            name: "",
            player_address_variable: "",
            function_name: "",
            useForwarder: false,
            forwarderAddress: null,
            forwarderABI: null,
            methodDataAttributeName: null,
            wantedData: null,
            countItems: false,
            contract_address: "",
            abi: null,
        }
    });

    async function addChallenge(data: z.infer<typeof createChallengeSchema>) {
        try {
            await axios.post(`${API_CONFIG.BACKEND_URL}/game/challenge/battle`, {
                gameID: Number(id),
                ...data
            });
            toast.success("Created challenge");
        } catch (err) {
            toast.error("Could not add challenge");
        }
    }

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

    async function handleChallengeClick(id: number) {
        try {
            setSelectedChallenge(id);
            setBattlesLoading(true);

            const res = await axios.get(`${API_CONFIG.BACKEND_URL}/activity/challenge/${id}`);
            const battles: FeaturedDeal[] = [];

            for (const d of res.data) {
                const parsed = featuredDealsSchema.safeParse(d);
                if (parsed.success) {
                    battles.push(parsed.data);
                }
            }
            setBattlesLoading(false);
            setBattles(battles);
        } catch (err) {
            setBattlesLoading(false);
            toast.error("Could not get battles");
            console.error("Could not get battles", err);
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/game-admin/manage-games')}
                    className="mb-6 font-rajdhani"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Games
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hero Section */}
                        <Card className="border-primary/20 bg-card overflow-hidden">
                            <CardHeader className="p-0">
                                <div className="relative aspect-video">
                                    <img
                                        src={`${API_CONFIG.ACTIVITY_IMAGE_URL}/${game.image}`}
                                        alt={game.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />



                                    {/* Battle Info Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-2">
                                            {game.name}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                                            <div className="flex items-center gap-2">
                                                <Gamepad2 className="h-4 w-4" />
                                                <span className="font-rajdhani">{game.category}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span className="font-rajdhani">{game.createdAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Battle Features */}
                        <Card className="border-primary/20 bg-card">
                            <CardHeader className="flex flex-row justify-between">
                                <CardTitle className="font-orbitron">Challenges</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Add Challenge</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(addChallenge)} className="space-y-8">


                                                <DialogHeader>
                                                    <DialogTitle>Create a New Challenge</DialogTitle>
                                                </DialogHeader>
                                                <Card className="border-secondary/20 bg-secondary/5">
                                                    <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`name`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Challenge Name</span>
                                                                            <InfoHover info="Name of the action you want to track. It can be anything" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="e.g., Survive 100 Waves" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`contract_address`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Contract Address</span>
                                                                            <InfoHover info="Address of the smart contract that's called when player performs action" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="0x..." {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <FormField
                                                            control={form.control}
                                                            name={`abi`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Contract ABI</span>
                                                                        <InfoHover info="ABI of the smart contract called" />
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder='[{"inputs":[{"name":"x","type":"uint256"}],"name":"increment","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]'
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`function_name`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Function Name</span>
                                                                            <InfoHover info="The name of the smart contract function that's executed when the player performs the action" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="e.g., completeWave" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`player_address_variable`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Player Address Variable</span>
                                                                            <InfoHover info="The name of the parameter in the smart contract function executed by the action that stores the player's address" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="e.g., playerAddress" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <FormField
                                                            control={form.control}
                                                            name={`useForwarder`}
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <Switch
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Use Forwarder</span>
                                                                        <InfoHover info="There are games that use a proxy smart contract that forwards transactions to other contracts responsible for handling in game actions. If you use a proxy contract please check this and enter its details below" />
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />

                                                        {form.watch(`useForwarder`) && (
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`forwarderAddress`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex flex-row gap-2 items-center">
                                                                                <span>Forwarder Address</span>
                                                                                <InfoHover info="Address of the proxy smart contract" />
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="0x..." {...field} />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <FormField
                                                                    control={form.control}
                                                                    name={`forwarderABI`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="flex flex-row gap-2 items-center">
                                                                                <span>Forwarder ABI</span>
                                                                                <InfoHover info="ABI of the proxy smartcontract" />
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <Textarea
                                                                                    placeholder='Forwarder ABI JSON'
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`methodDataAttributeName`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Item Variable</span>
                                                                            <InfoHover info="If the player interacts with something else in the action and you want to check for that other item you can give the name of the parameter that stores that other item in the smart contract function" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="e.g., methodData" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`wantedData`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Wanted Data</span>
                                                                            <InfoHover info="The value of the item that you're checking for" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="e.g., waveNumber" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <FormField
                                                            control={form.control}
                                                            name={`countItems`}
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <Switch
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Count Items</span>
                                                                        <InfoHover info="If the player can interact with multiple items in the action, check this to count them and have that count contribute to the goal" />
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </CardContent>
                                                </Card>
                                                <DialogFooter>
                                                    <Button type="submit" variant="outline">Create</Button>
                                                </DialogFooter>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    {challengesLoading === false ? challenges.map((challenge) => (
                                        <Card key={challenge.id} className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <CardTitle className="text-xl font-orbitron flex items-center gap-2">
                                                                {challenge.name}
                                                            </CardTitle>
                                                            <CardDescription className="flex items-center gap-2 mt-2">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-3 mb-1">
                                                                        <p className="font-medium font-rajdhani">{challenge.name}</p>
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground font-rajdhani">
                                                                        Function: <code className="bg-muted px-1 rounded">{challenge.function_name}</code> •
                                                                        Player Variable: <code className="bg-muted px-1 rounded">{challenge.player_address_variable}</code> •
                                                                        {challenge.battles} battles
                                                                    </p>
                                                                </div>
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleChallengeClick(challenge.id)}
                                                            className="font-rajdhani"
                                                        >
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            {selectedChallenge === challenge.id ? "Hide" : "View"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent>
                                                {selectedChallenge === challenge.id && (
                                                    <div className="border-t pt-4 space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <h3 className="text-lg font-semibold font-rajdhani flex items-center gap-2">
                                                                <Zap className="h-5 w-5 text-accent" />
                                                                Battles
                                                            </h3>
                                                            <div className="flex gap-2">
                                                                <Link to="/game-admin/create-activity">
                                                                    <Button size="sm" variant="outline" className="font-rajdhani">
                                                                        <Plus className="h-4 w-4 mr-2" />
                                                                        Create Battle
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                            {battlesLoading === false ? battles.map((battle) => (
                                                                <Card key={battle.id} className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
                                                                    <CardHeader>
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="flex items-center gap-4">
                                                                                <img
                                                                                    src={`${API_CONFIG.ACTIVITY_IMAGE_URL}/${battle.image}`}
                                                                                    alt={battle.name}
                                                                                    className="w-24 h-24 rounded-lg object-cover border border-primary/20"
                                                                                />
                                                                                <div>
                                                                                    <CardTitle className="text-xl font-orbitron flex items-center gap-2">
                                                                                        {battle.name}
                                                                                    </CardTitle>
                                                                                    <CardDescription className="flex items-center gap-2 mt-2">
                                                                                        <Badge variant="secondary" className="font-rajdhani">{game.category}</Badge>
                                                                                    </CardDescription>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <Button
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    onClick={() => navigate(`/battles/${battle.id}`)}
                                                                                    className="font-rajdhani"
                                                                                >
                                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </CardHeader>

                                                                    <CardContent>
                                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                                                            <div className="text-center">
                                                                                <p className="text-2xl font-bold text-primary font-orbitron">{battle.maxPlayers}</p>
                                                                                <p className="text-sm text-muted-foreground font-rajdhani">Total Players</p>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <p className="text-2xl font-bold text-yellow-400 font-orbitron">{battle.playerCount}</p>
                                                                                <p className="text-sm text-muted-foreground font-rajdhani">Players</p>
                                                                            </div>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            )) : <div className="text-center my-6">
                                                                Getting battles...
                                                            </div>}
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )) : <div className="text-center my-6">
                                        Getting Challenges
                                    </div>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
