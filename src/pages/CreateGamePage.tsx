
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, FileText, Gamepad2, Zap } from "lucide-react";
import { toast } from "sonner";

interface Activity {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  points: number;
  requirements: string;
}

export function CreateGamePage() {
  const navigate = useNavigate();
  
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    developer: "",
    releaseDate: "",
    status: "active",
    featured: false
  });

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      name: "",
      description: "",
      difficulty: "easy",
      points: 100,
      requirements: ""
    }
  ]);

  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now(),
      name: "",
      description: "",
      difficulty: "easy",
      points: 100,
      requirements: ""
    };
    setActivities([...activities, newActivity]);
  };

  const removeActivity = (id: number) => {
    if (activities.length > 1) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const updateActivity = (id: number, field: keyof Activity, value: string | number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating game:", { ...gameData, activities });
    
    toast.success("Game created successfully!");

    // In real app, this would call the API
    navigate("/manage-games");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CREATE NEW GAME
              </h1>
              <p className="text-muted-foreground mt-2 font-rajdhani">
                Add a new game to the SASAGAMES platform
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Game Information */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Game Information
                </CardTitle>
                <CardDescription>
                  Basic details about your game
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-rajdhani font-semibold">Game Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter game name"
                      value={gameData.name}
                      onChange={(e) => setGameData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-background/50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="developer" className="font-rajdhani font-semibold">Developer</Label>
                    <Input
                      id="developer"
                      placeholder="Game developer/studio"
                      value={gameData.developer}
                      onChange={(e) => setGameData(prev => ({ ...prev, developer: e.target.value }))}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-rajdhani font-semibold">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your game..."
                    value={gameData.description}
                    onChange={(e) => setGameData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[100px] bg-background/50"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="font-rajdhani font-semibold">Category</Label>
                    <Select value={gameData.category} onValueChange={(value) => setGameData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="racing">Racing</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="puzzle">Puzzle</SelectItem>
                        <SelectItem value="rpg">RPG</SelectItem>
                        <SelectItem value="shooter">Shooter</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="releaseDate" className="font-rajdhani font-semibold">Release Date</Label>
                    <Input
                      id="releaseDate"
                      type="date"
                      value={gameData.releaseDate}
                      onChange={(e) => setGameData(prev => ({ ...prev, releaseDate: e.target.value }))}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status" className="font-rajdhani font-semibold">Status</Label>
                    <Select value={gameData.status} onValueChange={(value) => setGameData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="coming-soon">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="font-rajdhani font-semibold">Game Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setGameData(prev => ({ ...prev, image: file.name }));
                        }
                      }}
                      className="bg-background/50"
                    />
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Activities */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-orbitron flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Game Activities
                    </CardTitle>
                    <CardDescription>
                      Define activities and challenges for your game
                    </CardDescription>
                  </div>
                  <Button type="button" onClick={addActivity} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {activities.map((activity, index) => (
                  <Card key={activity.id} className="border-secondary/20 bg-secondary/5">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-rajdhani">Activity {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeActivity(activity.id)}
                          disabled={activities.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-rajdhani font-medium">Activity Name *</Label>
                          <Input
                            placeholder="e.g., Complete 10 Levels"
                            value={activity.name}
                            onChange={(e) => updateActivity(activity.id, 'name', e.target.value)}
                            className="bg-background/50"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="font-rajdhani font-medium">Difficulty</Label>
                          <Select value={activity.difficulty} onValueChange={(value) => updateActivity(activity.id, 'difficulty', value)}>
                            <SelectTrigger className="bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-rajdhani font-medium">Description</Label>
                        <Textarea
                          placeholder="Describe what players need to do..."
                          value={activity.description}
                          onChange={(e) => updateActivity(activity.id, 'description', e.target.value)}
                          className="bg-background/50"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-rajdhani font-medium">Points Reward</Label>
                          <Input
                            type="number"
                            min="10"
                            max="10000"
                            step="10"
                            value={activity.points}
                            onChange={(e) => updateActivity(activity.id, 'points', parseInt(e.target.value) || 100)}
                            className="bg-background/50"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="font-rajdhani font-medium">Requirements</Label>
                          <Input
                            placeholder="e.g., Level 5+, Premium Account"
                            value={activity.requirements}
                            onChange={(e) => updateActivity(activity.id, 'requirements', e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Badge variant={activity.difficulty === 'easy' ? 'secondary' : activity.difficulty === 'medium' ? 'default' : 'destructive'}>
                          {activity.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {activity.points} points
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/manage-games")}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-rajdhani font-semibold px-8"
              >
                CREATE GAME
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
