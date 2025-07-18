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
import { Target, Calendar, Trophy, Users, Upload, Gamepad2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { API_CONFIG } from "@/config";
import { activitySchema } from "@/types";

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

    const form = useForm<ActivityFormData>({
        resolver: zodResolver(activitySchema),
        defaultValues: {
            challenge_id: 0,
            goal: 1,
            reward: 0,
            name: "",
            startDate: "",
            endDate: "",
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
            //Save image first
            if (data.image) {
                const imageUrl = await saveImage(data.image);
                if (!imageUrl) {
                    toast.error("Failed to upload activity image");
                    return;
                }

                const response = await axios.post(`${API_CONFIG.BACKEND_URL}/activity/create`, {
                    ...data,
                    instructions: instructions.filter(instruction => instruction.trim() !== ''),
                    image: imageUrl,
                });

                console.log("Activity created with ID:", response.data.id);
                toast.success("Activity created successfully!");
                form.reset();
                setInstructions([]);
                setImageFile(null);
                setSelectedGameId(null);
                setChallenges([]);
            }
            else {
                toast.error("Please upload an activity image");
                return;
            }

        } catch (error) {
            console.error("Error creating activity:", error);
            toast.error("Failed to create activity. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'hard': return 'text-orange-400';
            case 'expert': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                            <Target className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                CREATE ACTIVITY
                            </h1>
                            <p className="text-muted-foreground mt-2 font-rajdhani">
                                Create a new activity for players to compete in
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground font-rajdhani">Total Activities</p>
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
                        <CardHeader>
                            <CardTitle className="text-2xl font-orbitron flex items-center gap-2">
                                <Gamepad2 className="h-6 w-6" />
                                Select Game
                            </CardTitle>
                            <CardDescription>
                                Choose the game for which you want to create an activity
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Select onValueChange={handleGameSelection} value={selectedGameId?.toString() || ""}>
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
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Form - Only show if game is selected */}
                    {selectedGameId && (
                        <Card className="border-primary/20 bg-card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-orbitron">Activity Details</CardTitle>
                                <CardDescription>
                                    Fill in the details for your new activity
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
                                                            <FormLabel>Activity Name</FormLabel>
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
                                                            <FormLabel>Challenge</FormLabel>
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
                                                                placeholder="Describe the activity and what players need to do..."
                                                                className="min-h-[100px]"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Activity Settings */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold font-rajdhani">Activity Settings</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="goal"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Goal</FormLabel>
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
                                                            <FormLabel>Max Players</FormLabel>
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
                                                    control={form.control}
                                                    name="startDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Start Date</FormLabel>
                                                            <FormControl>
                                                                <Input type="datetime-local" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="endDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>End Date</FormLabel>
                                                            <FormControl>
                                                                <Input type="datetime-local" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Image Upload */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold font-rajdhani">Activity Image</h3>

                                            <FormField
                                                control={form.control}
                                                name="image"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Activity Image</FormLabel>
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
                                            {isLoading ? "CREATING..." : "CREATE ACTIVITY"}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}