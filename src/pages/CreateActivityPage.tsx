import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Target, Trophy, Users, Upload, Gamepad2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import axios from "axios";
import { API_CONFIG } from "@/config";
import { activitySchema } from "@/types";
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import InfoHover from "@/components/InfoHover";
import ActivateDealButton from "@/components/ActivateBattle";
import BattleSummary from "@/components/BattleSummary";
type ActivityFormData = z.infer<typeof activitySchema>;

interface Game {
    id: number;
    name: string;
    image: string;
    category: string;
}

interface Challenge {
    id: number;
    name: string;
}

export function CreateActivityPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGames, setIsLoadingGames] = useState(false);
    const [isLoadingChallenges, setIsLoadingChallenges] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [issue, setIssue] = useState(false);
    const token = localStorage.getItem("accessToken");

    const [activityID, setActivityID] = useState<number>(1);
    const [rewardPerUser, setRewardPerUser] = useState<number>(0);
    const [maxUsers, setMaxUsers] = useState<number>(0);

    const totalFunding = rewardPerUser * maxUsers;
    const platformCommission = totalFunding / 10;
    const totalRequired = platformCommission + totalFunding;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const form = useForm<ActivityFormData>({
        resolver: zodResolver(activitySchema),
        defaultValues: {
            challenge_id: 0,
            goal: 1,
            reward: 0,
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            image: null,
            about: "",
            instructions: [],
            maximum_num_players: 100,
        },
    });

    // Fetch all games on component mount
    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        setIsLoadingGames(true);
        try {
            const response = await axios.get(`${API_CONFIG.BACKEND_URL}/game`);
            setGames(response.data);
        } catch (error) {
            console.error("Error fetching games:", error);
            toast.error("Failed to fetch games. Please try again.");
        } finally {
            setIsLoadingGames(false);
        }
    };

    const fetchChallenges = async (gameId: number) => {
        setIsLoadingChallenges(true);
        try {
            const response = await axios.get(`${API_CONFIG.BACKEND_URL}/game/challenges/${gameId}`);
            setChallenges(response.data);
        } catch (error) {
            console.error("Error fetching challenges:", error);
            toast.error("Failed to fetch challenges. Please try again.");
            setChallenges([]);
        } finally {
            setIsLoadingChallenges(false);
        }
    };

    const handleGameSelection = (gameId: string) => {
        const id = parseInt(gameId);
        setSelectedGameId(id);
        setChallenges([]);
        form.setValue("challenge_id", 0);
        fetchChallenges(id);
    };

    async function saveImage(file: File): Promise<string | null> {
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await axios.post(`${API_CONFIG.BACKEND_URL}/game/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status !== 201) {
                return null;
            }

            return response.data;
        }
        catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
            return null;
        }
    }

    const addInstruction = () => {
        const newInstructions = [...instructions, ""];
        setInstructions(newInstructions);
        form.setValue("instructions", newInstructions);
    };

    const updateInstruction = (index: number, value: string) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
        form.setValue("instructions", newInstructions);
    };

    const removeInstruction = (index: number) => {
        const newInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(newInstructions);
        form.setValue("instructions", newInstructions);
    };

    const onSubmit = async (data: ActivityFormData) => {
        setIsLoading(true);
        try {
            if(!token){
                toast.error("You must be logged in to create an activity");
                return;
            }
            //Save image first
            if (data.image) {
                const imageUrl = await saveImage(data.image);
                if (!imageUrl) {
                    toast.error("Failed to upload battle image");
                    return;
                }

                const response = await axios.post(`${API_CONFIG.BACKEND_URL}/activity/create`, {
                    ...data,
                    instructions: instructions.filter(instruction => instruction.trim() !== ''),
                    image: imageUrl,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Battle created with ID:", response.data.id);
                toast.success("Battle created successfully!");
                form.reset();
                setInstructions([]);
                setImageFile(null);
                setSelectedGameId(null);
                setChallenges([]);
            }
            else {
                toast.error("Please upload an battle image");
                return;
            }

        } catch (error) {
            console.error("Error creating battle:", error);
            toast.error("Failed to create battle. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-20">
            <div className="container mx-auto px-4 py-8 grid md:grid-cols-3">
                <div className="max-w-4xl mx-auto col-span-2">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                            <Target className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                CREATE BATTLE
                            </h1>
                            <p className="text-muted-foreground mt-2 font-rajdhani">
                                Create a new battle for players to compete in
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground font-rajdhani">Total Battles</p>
                                        <p className="text-2xl font-bold font-orbitron text-primary">24</p>
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
                                        <p className="text-2xl font-bold font-orbitron text-accent">1,234</p>
                                    </div>
                                    <Users className="h-8 w-8 text-accent/60" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground font-rajdhani">Rewards Given</p>
                                        <p className="text-2xl font-bold font-orbitron text-green-400">15.2 ETH</p>
                                    </div>
                                    <Trophy className="h-8 w-8 text-green-400/60" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Game Selection */}
                    <Card className="border-primary/20 bg-card mb-6">
                        {activityID === 0 ? <CardHeader>
                            <CardTitle className="text-2xl font-orbitron flex items-center gap-2">
                                <Gamepad2 className="h-6 w-6" />
                                Select Game
                            </CardTitle>
                            <CardDescription>
                                Choose the game for which you want to create an battle
                            </CardDescription>
                        </CardHeader> : <CardHeader>
                            <CardTitle className="text-2xl font-orbitron flex items-center gap-2">
                                <Gamepad2 className="h-6 w-6" />
                                Lock Rewards
                            </CardTitle>
                            <CardDescription>
                                Lock the rewards for the battle in our smart contract and pay the 10% commission
                            </CardDescription>
                        </CardHeader>}


                        <CardContent>
                            {activityID === 0 ? <Select onValueChange={handleGameSelection} value={selectedGameId?.toString() || ""}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isLoadingGames ? "Loading games..." : "Select a game"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {games.map((game) => (
                                        <SelectItem key={game.id} value={game.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <span>{game.name}</span>
                                                <span className="text-xs text-muted-foreground">({game.category})</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> : <ActivateDealButton 
                                            activityID={activityID} 
                                            commissionPaid={false} 
                                            activated={false} 
                                            rewardPerUser={rewardPerUser} 
                                            maxUsers={maxUsers}
                            />}
                        </CardContent>
                    </Card>

                    {/* Form - Only show if game is selected */}
                    {activityID === 0 && selectedGameId && (
                        <Card className="border-primary/20 bg-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-orbitron">Battle Details</CardTitle>
                                <CardDescription>
                                    Fill in the details for your new battle
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Basic Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold font-rajdhani">Basic Information</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex flex-row gap-2 items-center">
                                                                <span>Battle Name</span>
                                                                <InfoHover info="Name that will be shown in the explore battles page" />
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
                                                    name="challenge_id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex flex-row gap-2 items-center">
                                                                <span>Challenge</span>
                                                                <InfoHover info="The action that the player should do to get the reward" />
                                                            </FormLabel>
                                                            <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder={isLoadingChallenges ? "Loading challenges..." : "Select a challenge"} />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {challenges.map((challenge) => (
                                                                        <SelectItem key={challenge.id} value={challenge.id.toString()}>
                                                                            {challenge.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="about"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>About (Optional)</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Describe the battle and what players need to do..."
                                                                className="min-h-[100px]"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Battle Settings */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold font-rajdhani">Battle Settings</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="goal"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex flex-row gap-2 items-center">
                                                                <span>Goal</span>
                                                                <InfoHover info="The number of times the player should perform the action to get the reward" />
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="e.g., 100"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="reward"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Reward (ETH, Optional)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    step="0.001"
                                                                    placeholder="0.1"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="maximum_num_players"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex flex-row gap-2 items-center">
                                                                <span>Max Players</span>
                                                                <InfoHover info="The maximum number of users that can participate in the battle" />
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="100"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    name="startDate"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem className="text-white">
                                                            <FormLabel className="text-slate-300 block md:inline-block">
                                                                <div className="flex flex-row gap-2 items-center pr-2">
                                                                    <span>Start Date *</span>
                                                                    <InfoHover info="The date the users can start joining the battle" />
                                                                </div>
                                                            </FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-[240px] pl-3 text-left font-normal text-white",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, "PPP")
                                                                            ) : (
                                                                                <span className="text-white">Pick a date</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-white" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        disabled={(date) => {
                                                                            if (issue === true) {
                                                                                return true;
                                                                            }

                                                                            return date < today
                                                                        }}
                                                                        captionLayout="dropdown"
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />


                                                <FormField
                                                    name="endDate"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem className="text-white">
                                                            <FormLabel className="text-slate-300 block md:inline-block">
                                                                <div className="flex flex-row gap-2 items-center pr-2">
                                                                    <span>End date *</span>
                                                                    <InfoHover info="The last date a player can join a battle" />
                                                                </div>
                                                            </FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-[240px] pl-3 text-left font-normal text-white",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, "PPP")
                                                                            ) : (
                                                                                <span className="text-white">Pick a date</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-white" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        disabled={(date) => {
                                                                            if (issue === true) {
                                                                                return true;
                                                                            }

                                                                            return date < today
                                                                        }}
                                                                        captionLayout="dropdown"
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Image Upload */}
                                        <div className="space-y-4">


                                            <FormField
                                                control={form.control}
                                                name="image"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Battle Image</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center space-x-4">
                                                                <Input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (file) {
                                                                            field.onChange(file);
                                                                        }
                                                                    }}
                                                                    className="flex-1"
                                                                />
                                                                <Upload className="h-5 w-5 text-muted-foreground" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Instructions */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold font-rajdhani">Instructions (Optional)</h3>

                                            <div className="space-y-2">
                                                {instructions.map((instruction, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Input
                                                            value={instruction}
                                                            onChange={(e) => updateInstruction(index, e.target.value)}
                                                            placeholder={`Instruction ${index + 1}`}
                                                            className="flex-1"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removeInstruction(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addInstruction}
                                                >
                                                    Add Instruction
                                                </Button>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isLoading || challenges.length === 0}
                                            className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity"
                                        >
                                            {isLoading ? "CREATING..." : "CREATE BATTLE"}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <BattleSummary 
                    rewardPerUser={rewardPerUser} 
                    totalFunding={totalFunding} 
                    maxUsers={maxUsers} 
                    platformCommission={platformCommission} 
                    totalRequired={totalRequired} 
                />
            </div>
        </div>
    );
}