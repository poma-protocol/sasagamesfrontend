import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2, Upload } from "lucide-react";

export function CreateBattlePage() {
  const [battleData, setBattleData] = useState({
    name: "",
    challenge_id: "",
    goal: "",
    reward: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    maximum_num_players: "",
    image: "",
    about: "",
    instructions: [""]
  });

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...battleData.instructions];
    newInstructions[index] = value;
    setBattleData(prev => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setBattleData(prev => ({ ...prev, instructions: [...prev.instructions, ""] }));
  };

  const removeInstruction = (index: number) => {
    if (battleData.instructions.length > 1) {
      const newInstructions = battleData.instructions.filter((_, i) => i !== index);
      setBattleData(prev => ({ ...prev, instructions: newInstructions }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating battle:", battleData);
    // In real app, this would call the API
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent">
                CREATE NEW BATTLE
              </CardTitle>
              <CardDescription>
                Set up a new challenge for players to compete in
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Battle Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Battle Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter battle name"
                    value={battleData.name}
                    onChange={(e) => setBattleData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                {/* Challenge Selection */}
                <div className="space-y-2">
                  <Label htmlFor="challenge">Challenge</Label>
                  <Select value={battleData.challenge_id} onValueChange={(value) => setBattleData(prev => ({ ...prev, challenge_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Zombie Survival</SelectItem>
                      <SelectItem value="2">Racing Championship</SelectItem>
                      <SelectItem value="3">Treasure Hunt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal and Reward */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Goal</Label>
                    <Input
                      id="goal"
                      type="number"
                      placeholder="100"
                      value={battleData.goal}
                      onChange={(e) => setBattleData(prev => ({ ...prev, goal: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reward">Reward (ETH)</Label>
                    <Input
                      id="reward"
                      type="number"
                      step="0.01"
                      placeholder="0.5"
                      value={battleData.reward}
                      onChange={(e) => setBattleData(prev => ({ ...prev, reward: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Start and End Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !battleData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {battleData.startDate ? format(battleData.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={battleData.startDate}
                          onSelect={(date) => setBattleData(prev => ({ ...prev, startDate: date }))}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !battleData.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {battleData.endDate ? format(battleData.endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={battleData.endDate}
                          onSelect={(date) => setBattleData(prev => ({ ...prev, endDate: date }))}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Max Players */}
                <div className="space-y-2">
                  <Label htmlFor="maxPlayers">Maximum Players</Label>
                  <Input
                    id="maxPlayers"
                    type="number"
                    placeholder="500"
                    value={battleData.maximum_num_players}
                    onChange={(e) => setBattleData(prev => ({ ...prev, maximum_num_players: e.target.value }))}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Battle Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setBattleData(prev => ({ ...prev, image: file.name }));
                        }
                      }}
                    />
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <div className="space-y-2">
                    {battleData.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          placeholder={`Step ${index + 1}`}
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeInstruction(index)}
                          disabled={battleData.instructions.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addInstruction}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Instruction
                    </Button>
                  </div>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <Label htmlFor="about">About (Optional)</Label>
                  <Textarea
                    id="about"
                    placeholder="Describe the battle..."
                    value={battleData.about}
                    onChange={(e) => setBattleData(prev => ({ ...prev, about: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity"
                >
                  CREATE BATTLE
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}