
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Target, Calendar, Trophy, Users, Upload } from "lucide-react";
import { toast } from "sonner";
import { API_CONFIG } from "@/config";

const activitySchema = z.object({
  challenge_id: z.number().min(1, "Challenge ID is required"),
  goal: z.number().min(1, "Goal is required"),
  reward: z.number().min(0, "Reward must be non-negative").optional(),
  name: z.string().min(1, "Activity name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  image: z.string().min(1, "Image is required"),
  about: z.string().optional(),
  instructions: z.array(z.string()).optional(),
  maximum_num_players: z.number().min(1, "Maximum players must be at least 1"),
});

type ActivityFormData = z.infer<typeof activitySchema>;

export function CreateActivityPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [instructions, setInstructions] = useState<string[]>([]);

  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      challenge_id: 0,
      goal: 1,
      reward: 0,
      name: "",
      startDate: "",
      endDate: "",
      image: "",
      about: "",
      instructions: [],
      maximum_num_players: 100,
    },
  });

  const mockChallenges = [
    { id: 1, name: "Zombie Apocalypse - Survive 100 Waves" },
    { id: 2, name: "Racing Championship - Win 5 Races" },
    { id: 3, name: "Treasure Hunt - Find 10 Treasures" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      // For now, we'll use a placeholder URL
      form.setValue("image", URL.createObjectURL(file));
    }
  };

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
      const response = await fetch(`${API_CONFIG.BACKEND_URL}/activity/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          instructions: instructions.filter(instruction => instruction.trim() !== ''),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create activity');
      }

      const result = await response.json();
      console.log("Activity created with ID:", result.id);
      toast.success("Activity created successfully!");
      form.reset();
      setInstructions([]);
      setImageFile(null);
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
    <div className="min-h-screen bg-background text-foreground">
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

          {/* Form */}
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
                                  <SelectValue placeholder="Select a challenge" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mockChallenges.map((challenge) => (
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
                                onChange={handleImageUpload}
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
                    disabled={isLoading}
                    className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity"
                  >
                    {isLoading ? "CREATING..." : "CREATE ACTIVITY"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
